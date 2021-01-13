// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await graphQLClient.request(gql`
    query GetMens {
      productCollection {
        items {
          id
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
        }
      }
    }
  `)

  res.status(200).json({ data: response.productCollection.items })
}
