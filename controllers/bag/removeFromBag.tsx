/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { BagItem } from '@/types/bagItem'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  message?: string
  error?: string
}

const removeFromWishlist = async (
  req: NextApiRequest,
  res: NextApiResponse<ResData>,
  item: BagItem
) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for wishlist and delete item from array
    const userRef = db.collection('users').doc(token.uid)
    const result = await userRef.update({
      bag: firebaseAdmin.firestore.FieldValue.arrayRemove(item),
    })
    if (!result) {
      throw new Error('user data not found')
    } else {
      return res.status(200).json({ message: 'item removed from your shopping bag' })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export default removeFromWishlist
