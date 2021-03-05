/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { Item } from '@/types/item'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  data?: Item
  error?: string
}

const addToWishlist = async (req: NextApiRequest, res: NextApiResponse<ResData>, item: Item) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for wishlist
    const userRef = db.collection('users').doc(token.uid)
    const result = await userRef.update({
      wishlist: firebaseAdmin.firestore.FieldValue.arrayUnion(item),
    })
    if (!result) {
      throw new Error('user data not found')
    } else {
      return res.status(200).json({ data: item })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export default addToWishlist
