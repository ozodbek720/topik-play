import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, Timestamp, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDPy3xcJz_FIv_D5jlaqT3_vD82UUPa-3I',
  authDomain: 'topik-play.firebaseapp.com',
  projectId: 'topik-play',
  storageBucket: 'topik-play.firebasestorage.app',
  messagingSenderId: '249924325339',
  appId: '1:249924325339:web:6eb3f4566931c0a54061fe',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const observeAuth = (callback, onError) => onAuthStateChanged(auth, callback, onError)
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
export const signOutUser = () => signOut(auth)

export async function loadAccountData(uid) {
  const accountDocument = await getDoc(doc(db, 'users', uid, 'appData', 'learning'))
  return accountDocument.exists() ? accountDocument.data() : null
}

export async function saveAccountData(uid, data) {
  await setDoc(doc(db, 'users', uid, 'appData', 'learning'), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// --- Profil funksiyalari ---

export async function loadProfile(uid) {
  const docRef = doc(db, 'profiles', uid)
  const snapshot = await getDoc(docRef)
  return snapshot.exists() ? snapshot.data() : null
}

export async function saveProfile(uid, profileData) {
  const docRef = doc(db, 'profiles', uid)
  await setDoc(docRef, {
    ...profileData,
    updatedAt: serverTimestamp(),
  })
}

// --- Chat funksiyalari ---

export async function sendMessage(chatId, senderId, senderName, text) {
  await addDoc(collection(db, 'chats', chatId, 'messages'), {
    senderId,
    senderName: senderName || 'Noma\'lum',
    text,
    timestamp: serverTimestamp(),
  })
}

export function listenToMessages(chatId, callback) {
  const q = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc'),
  )
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(messages)
  })
}

export async function getAllProfiles() {
  const snapshot = await getDocs(collection(db, 'profiles'))
  const profiles = []
  snapshot.forEach((d) => {
    profiles.push({ id: d.id, ...d.data() })
  })
  return profiles
}

export function listenToProfiles(callback) {
  return onSnapshot(collection(db, 'profiles'), (snapshot) => {
    const profiles = []
    snapshot.forEach((d) => {
      profiles.push({ id: d.id, ...d.data() })
    })
    callback(profiles)
  })
}
