/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { BagItem } from '@/types/bagItem'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  bag?: BagItem[]
  error?: string
}

const getBagOnSignIn = async (
  req: NextApiRequest,
  res: NextApiResponse<ResData>,
  guestBag: BagItem[]
) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for wishlist
    const userRef = db.collection('users').doc(token.uid)
    const doc = await userRef.get()
    if (doc) {
      const { bag } = doc.data()
      const ids = new Set(guestBag.map((item) => item.id))
      const mergedBag = [...guestBag, ...bag.filter((item: BagItem) => !ids.has(item.id))]
      await userRef.update({
        bag: mergedBag,
      })
      return res.status(200).json({ bag: mergedBag })
    } else {
      throw new Error('user data not found')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export default getBagOnSignIn
