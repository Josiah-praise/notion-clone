import { initializeApp, getApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = JSON.parse(process.env["SERVICE_TOKEN_JSON"] || '{}');


const adminApp =
    getApps().length === 0 ? initializeApp({ credential: cert(serviceKey) }) : getApp();
const adminDb = getFirestore(adminApp);

export { adminApp, adminDb};
