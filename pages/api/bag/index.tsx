import { addToBag, getBag, getBagOnSignIn, removeFromBag } from '@/controllers/bag'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getBag(req, res)
    case 'POST':
      return addToBag(req, res, req.body)
    case 'PUT':
      if (req.body && req.body.route === 'fetchBagOnSignIn') {
        return getBagOnSignIn(req, res, req.body.bag)
      } else {
        return removeFromBag(req, res, req.body)
      }
    default:
      //Method not allowed
      return res.status(405).end()
  }
}
