import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await graphQLClient.request(
    gql`
      query GetSearchData {
        productCollection {
          items {
            name
            colour
            slug
            gender
          }
        }
      }
    `
  )

  res.status(200).json({ data: response.productCollection.items })
}
