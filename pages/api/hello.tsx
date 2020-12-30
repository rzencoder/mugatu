// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await graphQLClient.request(gql`
    query GetMens {
      productCollection {
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
  `)

  res.status(200).json({ data: response.productCollection.items })
}
