/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { Item } from '@/types/item'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  wishlist?: Item[]
  error?: string
}

const getWishlist = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for wishlist
    const userRef = db.collection('users').doc(token.uid)
    const doc = await userRef.get()
    if (!doc.exists) {
      throw new Error('user data not found')
    } else {
      return res.status(200).json({ wishlist: doc.data().wishlist })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export default getWishlist
