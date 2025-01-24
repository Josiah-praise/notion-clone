import { initializeApp, getApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceKey from "./service-token.json" assert { type: "json" };


const adminApp =
    getApps().length === 0 ? initializeApp({ credential: cert(serviceKey) }) : getApp();
const adminDb = getFirestore(adminApp);

export { adminApp, adminDb};
