import { createClient } from '@supabase/supabase-js'

// ⚠️ Supabase dashboard'dan o'z loyihangiz ma'lumotlarini qo'ying
// 1. https://supabase.com da ro'yxatdan o'ting
// 2. Yangi loyiha yarating
// 3. Settings → API bo'limidan URL va anon key ni ko'chiring
const supabaseUrl = 'https://yurgvsyplqyptghuhqqu.supabase.co'
const supabaseAnonKey = 'sb_publishable_WeDzkuqLBNWOCJ06F9F0EA_GrTHAK6n'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// --- Authentication ---

export const observeAuth = (callback, onError) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null
    if (onError && !user && event === 'PASSWORD_RECOVERY') {
      // ignore
    }
    callback(user)
  })
  // Initial state
  supabase.auth.getSession().then(({ data: { session } }) => {
    callback(session?.user || null)
  }).catch(onError)
  return subscription
}

export const signInWithGooglePopup = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'Google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  if (error) throw error
  return data
}

export const signInWithGoogleRedirect = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'Google',
    options: {
      redirectTo: window.location.origin,
    },
  })
  if (error) throw error
  return data
}

export const getRedirectResultAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session ? { user: session.user } : null
}

export const signOutUser = () => supabase.auth.signOut()

// --- Email/Parol orqali hisob ochish va kirish ---

export const createUserWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// --- Akkaunt ma'lumotlari ---

export async function loadAccountData(uid) {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('uid', uid)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data || null
}

export async function saveAccountData(uid, data) {
  const { error } = await supabase
    .from('accounts')
    .upsert({
      uid,
      ...data,
      updatedAt: new Date().toISOString(),
    }, { onConflict: 'uid' })
  if (error) throw error
}

// --- Profil funksiyalari ---

export async function loadProfile(uid) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('uid', uid)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data || null
}

export async function saveProfile(uid, profileData) {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      uid,
      ...profileData,
      updatedAt: new Date().toISOString(),
    }, { onConflict: 'uid' })
  if (error) throw error
}

// --- Chat funksiyalari ---

export async function sendMessage(chatId, senderId, senderName, text) {
  const { error } = await supabase
    .from('messages')
    .insert({
      chatId,
      senderId,
      senderName: senderName || 'Noma\'lum',
      text,
      timestamp: new Date().toISOString(),
    })
  if (error) throw error
}

export function listenToMessages(chatId, callback) {
  const channel = supabase
    .channel(`messages:${chatId}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'messages', filter: `chatId=eq.${chatId}` },
      (payload) => {
        // Reload all messages for this chat
        loadMessagesForChat(chatId, callback)
      }
    )
    .subscribe()

  // Initial load
  loadMessagesForChat(chatId, callback)

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel)
    },
  }
}

async function loadMessagesForChat(chatId, callback) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chatId', chatId)
    .order('timestamp', { ascending: true })
  if (!error && data) {
    callback(data.map((d) => ({ id: d.id || Math.random().toString(36), ...d })))
  }
}

export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('displayName', { ascending: true })
  if (error) throw error
  return (data || []).map((d) => ({ id: d.uid, ...d }))
}

export function listenToProfiles(callback) {
  const channel = supabase
    .channel('profiles')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'profiles' },
      () => {
        getAllProfiles().then(callback).catch(() => {})
      }
    )
    .subscribe()

  // Initial load
  getAllProfiles().then(callback).catch(() => {})

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel)
    },
  }
}

// --- Dostlar funksiyalari ---

export async function addFriend(myUid, friendUid) {
  const { error } = await supabase
    .from('friends')
    .insert({
      myUid,
      friendUid,
      addedAt: new Date().toISOString(),
    })
  if (error) throw error
}

export async function removeFriend(myUid, friendUid) {
  const { error } = await supabase
    .from('friends')
    .delete()
    .eq('myUid', myUid)
    .eq('friendUid', friendUid)
  if (error) throw error
}

export async function getFriends(uid) {
  const { data, error } = await supabase
    .from('friends')
    .select('*')
    .eq('myUid', uid)
  if (error) throw error
  return (data || []).map((d) => ({ id: d.friendUid, ...d }))
}

export function listenToFriends(uid, callback) {
  const channel = supabase
    .channel(`friends:${uid}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'friends', filter: `myUid=eq.${uid}` },
      () => {
        getFriends(uid).then(callback).catch(() => {})
      }
    )
    .subscribe()

  // Initial load
  getFriends(uid).then(callback).catch(() => {})

  return {
    unsubscribe: () => {
      supabase.removeChannel(channel)
    },
  }
}
