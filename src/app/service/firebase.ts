import { initializeApp } from "firebase/app"
import { FIREBASE_CONFIG } from "../config/authconfig"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

export const firebaseApp = initializeApp(FIREBASE_CONFIG)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
export const db = getFirestore(firebaseApp)