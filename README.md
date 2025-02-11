This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

- First install the dependencies, 

```bash
npm install package.json
```
- create a .env.local file in the root of the folder and add the follwing variables
```bash
# CLERK VARIABLES
# get this from clerk after creating an account and setting up a project
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=....  
CLERK_SECRET_KEY=....

# LIVEBLOCKS VARIABLES
# get this from liveblocks after setting up an account and a project
NEXT_PUBLIC_LIVESBLOCKs_PUBLIC_KEY=....
LIVEBLOCKS_PRIVATE_KEY=.....
```
- create two json files
```json
# service-token.json
{
    "type": "...",
    "project_id": "...",
    "private_key_id": "...",
    "private_key": "...",
    "client_email": "....",
    "client_id": "....",
    "auth_uri": "....",
    "token_uri": "....",
    "auth_provider_x509_cert_url": "...",
    "client_x509_cert_url": "....",
    "universe_domain": "..."
}

# firebase-client-config.json
{
    "apiKey": "....",
    " authDomain": ".....",
    "projectId": "....",
    "storageBucket": "...",
    " messagingSenderId": "....",
    "appId": "....",
    " measurementId": "...."
}

# You wil get these from firebase after you create an account and set up a project
```

- then start the development server
```bash
npm run dev
# and wait for it to compile
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `/src/app/page.tsx`. The page auto-updates as you edit the file.

## About Project
This project is a collaborative note taking app

## Tech Stack
1. [NextJs](https://nextjs.org/)
2. [Clerk](https://clerk.com/) - for authentication
3. [Firestore](https://firebase.google.com/docs/firestore) - Realtime document storage
4. [Cloudflare workers](https://workers.cloudflare.com/) - AI workers
5. [Liveblocks](https://liveblocks.io/) - collaborative features
6. [Hono](https://hono.dev/) - web framework for edge functions