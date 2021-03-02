import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = parseCookies({ req })
    // Verify user as a firebase auth account
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { uid } = token
    // create user account for additional info in firestore db
    const docRef = db.collection('users').doc(uid)
    await docRef.set({
      wishlist: [],
      bag: [],
    })
    return res.status(200).json({ message: 'account creation successful' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}
