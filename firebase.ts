import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCFKPfK2A7s4OKDJ0xfSczVo67KlMJWF8Q",
  authDomain: "notion-clone-c4227.firebaseapp.com",
  projectId: "notion-clone-c4227",
  storageBucket: "notion-clone-c4227.firebasestorage.app",
  messagingSenderId: "43987731577",
  appId: "1:43987731577:web:69692f29252e9d639d40a8",
  measurementId: "G-0LK6C1319Z",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };