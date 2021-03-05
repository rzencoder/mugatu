/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { BagItem } from '@/types/bagItem'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  bag?: BagItem[]
  error?: string
}

const addToBag = async (req: NextApiRequest, res: NextApiResponse<ResData>, item: BagItem) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for wishlist
    const userRef = db.collection('users').doc(token.uid)
    const doc = await userRef.get()
    if (doc) {
      const { bag } = doc.data()
      const filteredBag = bag.filter((bagItem: BagItem) => bagItem.id !== item.id)
      await userRef.update({
        bag: [...filteredBag, item],
      })
      return res.status(200).json({ bag: [...filteredBag, item] })
    } else {
      throw new Error('user data not found')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export default addToBag
