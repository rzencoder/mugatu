import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { Item } from '@/types/item'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  message: string
}

const removeFromWishlist = async (
  req: NextApiRequest,
  res: NextApiResponse<ResData>,
  item: Item
) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for wishlist and delete item from array
    const userRef = db.collection('users').doc(token.uid)
    const result = await userRef.update({
      wishlist: firebaseAdmin.firestore.FieldValue.arrayRemove(item),
    })
    if (!result) {
      throw new Error('user data not found')
    } else {
      return res.status(200).json({ message: 'item removed from your wishlist' })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error.message })
  }
}

export default removeFromWishlist
