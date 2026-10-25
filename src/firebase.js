import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase konfiguratsiya — o'z qiymatlaringizni qo'ying
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
}
