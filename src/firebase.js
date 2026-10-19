import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'

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
