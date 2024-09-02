import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID
};

console.log(firebaseConfig)

// REACT_APP_PUBLIC_FIREBASE_API_KEY="AIzaSyCmTR-zS2lSFXSgfvYmvnmi9NZj4J3PRKk"
// REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN="travelsaga-4628b.firebaseapp.com"
// REACT_APP_PUBLIC_FIREBASE_PROJECT_ID="travelsaga-4628b"
// REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET="travelsaga-4628b.appspot.com"
// REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="200516872718"
// REACT_APP_PUBLIC_FIREBASE_APP_ID="1:200516872718:web:c240163e78fa2027006a5f"


const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);

