import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { BagItem } from '@/types/bagItem'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

const addToBag = async (req: NextApiRequest, res: NextApiResponse, item: BagItem) => {
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
    return res.status(400).json({ error })
  }
}

export default addToBag
