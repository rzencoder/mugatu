import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const cookies = parseCookies({ req })
      // Verify user as a firebase auth account
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
      const { uid } = token
      // delete users firestore document
      const docRef = db.collection('users').doc(uid)
      await docRef.delete()
      return res.status(200).json({ message: 'firestore document deleted successfully' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error.message })
    }
  } else {
    return res.status(405).end()
  }
}
