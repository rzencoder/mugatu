/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { db, firebaseAdmin } from '@/firebase/firebaseAdmin'
import { BagItem } from '@/types/bagItem'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

interface ResData {
  bag?: BagItem[]
  error?: string
}

const getBag = async (req: NextApiRequest, res: NextApiResponse<ResData>) => {
  try {
    // Verify user
    const cookies = parseCookies({ req })
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    // Search firestore for bag
    const userRef = db.collection('users').doc(token.uid)
    const doc = await userRef.get()
    if (!doc.exists) {
      throw new Error('user data not found')
    } else {
      return res.status(200).json({ bag: doc.data().bag })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

export default getBag
