import firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY_S.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL_S,
      projectId: process.env.FIREBASE_PROJECT_ID_S,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL_S,
  })
}

const db = firebaseAdmin.firestore()

export { firebaseAdmin, db }
