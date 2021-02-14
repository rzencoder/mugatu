import { formatResponseData, formatSearchDataResponse } from '../../utils/'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'
import Fuse from 'fuse.js'
import searchOptions from '../../config/search'
import { GET_ALL_PRODUCTS } from 'graphql/queries'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await graphQLClient.request(GET_ALL_PRODUCTS)
  const data = formatResponseData(response.productCollection.items)
  const fuse = new Fuse(data, searchOptions)
  const searchData = fuse.search(String(req.query.search))
  const formattedData = formatSearchDataResponse(searchData)
  res.status(200).json({ data: formattedData })
}
