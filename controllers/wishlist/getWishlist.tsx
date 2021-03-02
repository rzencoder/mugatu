import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

const getWishlist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { uid } = token
    // Search firestore for wishlist
    const userRef = db.collection('users').doc(uid)
    const doc = await userRef.get()
    if (!doc.exists) {
      throw new Error('user data not found')
    } else {
      return res.status(200).json({ wishlist: doc.data().wishlist })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
}

export default getWishlist
