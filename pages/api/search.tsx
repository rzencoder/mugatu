import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const response = await graphQLClient.request(
    gql`
      query GetMens($gender: String!) {
        productCollection(where: { gender: $gender }) {
          items {
            name
            slug
            price
            rrp
            image {
              url(transform: { width: 400 })
            }
          }
        }
      }
    `,
    { gender: query.gender }
  )

  res.status(200).json({ data: response.productCollection.items })
}
