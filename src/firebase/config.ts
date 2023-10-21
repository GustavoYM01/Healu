import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: "trimed-b88bf.appspot.com",
  messagingSenderId: "995798443798",
  appId: "1:995798443798:web:b403c66cd38b8030879237",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = {
  auth: getAuth(app),
  db: getFirestore(app),
  storage: getStorage(app),
  authState: onAuthStateChanged,
};
export { firebase };
