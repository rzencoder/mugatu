import { formatResponseData } from '../../utils/'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'
import { GET_PRODUCTS_BY_GENDER } from 'graphql/queries'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await graphQLClient.request(GET_PRODUCTS_BY_GENDER, { gender: req.query.gender })
  const products = formatResponseData(response.productCollection.items)
  res.status(200).json({ products })
}
