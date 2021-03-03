import { addToBag, getBag, removeFromBag } from '@/controllers/bag'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const item = req.body
  switch (req.method) {
    case 'GET':
      console.log('here')
      return getBag(req, res)
    case 'POST':
      return addToBag(req, res, item)
    case 'PUT':
      return removeFromBag(req, res, item)
    default:
      //Method not allowed
      return res.status(405).end()
  }
}
