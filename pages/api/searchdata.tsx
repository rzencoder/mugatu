import { GET_SEARCH_DATA } from 'graphql/queries'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await graphQLClient.request(GET_SEARCH_DATA)
  res.status(200).json({ data: response.productCollection.items })
}
