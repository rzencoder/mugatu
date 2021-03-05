import { addToWishlist, getWishlist, removeFromWishlist } from '@/controllers/wishlist'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getWishlist(req, res)
    case 'POST':
      return addToWishlist(req, res, req.body)
    case 'PUT':
      return removeFromWishlist(req, res, req.body)
    default:
      //Method not allowed
      return res.status(405).end()
  }
}
