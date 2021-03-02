import { addToWishlist, getWishlist, removeFromWishlist } from '@/controllers/wishlist'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const item = req.body
  switch (req.method) {
    case 'GET':
      return getWishlist(req, res)
    case 'POST':
      return addToWishlist(req, res, item)
    case 'PUT':
      return removeFromWishlist(req, res, item)
    default:
      //Method not allowed
      return res.status(405).end()
  }
}
