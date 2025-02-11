import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from './firbase-client-config.json' assert {type: 'json'}

const app = getApps().length === 0 ? initializeApp(config) : getApp();
const db = getFirestore(app);

export { db };