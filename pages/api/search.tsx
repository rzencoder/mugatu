import { formatResponseData } from '../../utils/'
import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const response = await graphQLClient.request(
    gql`
      query GetByGender($gender: String!) {
        productCollection(where: { gender: $gender }) {
          items {
            name
            rrp
            price
            colour
            sizes
            slug
            popular
            image {
              url(transform: { width: 400 })
            }
            sys {
              id
            }
          }
        }
      }
    `,
    { gender: query.gender }
  )

  const data = formatResponseData(response.productCollection.items)
  res.status(200).json({ data })
}
