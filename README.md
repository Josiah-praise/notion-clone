# 📜 Collaborative Note-Taking App  

A **Next.js-powered** collaborative note-taking app that allows users to create and share documents in real-time. With **live cursors, concurrent editing, and permission management**, teams can collaborate seamlessly without page reloads. Built with **Liveblocks, YJS, Clerk, Firestore, and Cloudflare Workers**, this app ensures a smooth and dynamic editing experience.  

## 🚀 Features  

✅ **Real-Time Collaborative Editing** – Multiple users can edit a document at the same time with **YJS-powered CRDT synchronization**.  
✅ **Live Cursors & Presence** – See where other users are typing in real time with **Liveblocks**.  
✅ **Granular Edit Permissions** – Document owners can **grant or revoke** edit access at any time.  
✅ **Instant Updates Across Clients** – Any change to a document is reflected in real-time for all connected users—**no page reloads needed**.  
✅ **Secure Authentication** – Powered by **Clerk**, ensuring a smooth and secure login experience.  
✅ **Optimized for Edge Functions** – Uses **Cloudflare Workers** for fast AI-driven chat and translation.  

---

## 🛠️ Tech Stack  

| **Technology**  | **Purpose**  |  
|----------------|-------------|  
| [Next.js](https://nextjs.org/)  | Core framework for the application  |  
| [Clerk](https://clerk.com/)  | Authentication and user management  |  
| [Firestore](https://firebase.google.com/docs/firestore)  | Realtime document storage  |  
| [Cloudflare Workers](https://workers.cloudflare.com/)  | AI-driven text enhancements at the edge  |  
| [Liveblocks](https://liveblocks.io/)  | Live cursors, presence, and collaborative editing  |  
| [Hono](https://hono.dev/)  | Web framework for edge functions  |  

---

## 🛠️ Getting Started  

### 1️⃣ Install Dependencies  

```bash
npm install
```

### 2️⃣ Set Up Environment Variables
Create a .env.local file in the root of your project and add the following:
```bash
# CLERK VARIABLES  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...  
CLERK_SECRET_KEY=...  

# LIVEBLOCKS VARIABLES  
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=...  
LIVEBLOCKS_PRIVATE_KEY=...  
```
### 3️⃣ Create Firebase Config Files
Create service-token.json and firebase-client-config.json in the root directory and add the necessary credentials from Firebase.

```json
// service-token.json
{
    "type": "...",
    "project_id": "...",
    "private_key_id": "...",
    "private_key": "...",
    "client_email": "...",
    "client_id": "...",
    "auth_uri": "...",
    "token_uri": "...",
    "auth_provider_x509_cert_url": "...",
    "client_x509_cert_url": "...",
    "universe_domain": "..."
}

// firebase-client-config.json
{
    "apiKey": "...",
    "authDomain": "...",
    "projectId": "...",
    "storageBucket": "...",
    "messagingSenderId": "...",
    "appId": "...",
    "measurementId": "..."
}
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How It Works
1. Create a document – Start a new document and begin taking notes.
2. Share with collaborators – Grant edit access to other users.
3. Real-time collaboration – Live cursors and text updates appear instantly for all connected users.
4. Revoke access anytime – The document owner can remove edit permissions whenever needed.
5. Chat with document
6. Get translated document summary

**🚀 Start collaborating today!**