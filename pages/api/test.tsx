import { db } from '@/firebase/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const db = firebaseAdmin.firestore()
  // const cityRef = db.collection('cities').doc('SF')
  // const doc = await cityRef.get()
  // if (!doc.exists) {
  //   console.log('No such document!')
  // } else {
  //   console.log('Document data:', doc.data())
  // }
  return res.status(200).json({ data: 'hello' })
}
