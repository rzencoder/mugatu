import { formatResponseData, formatSearchDataResponse } from '../../utils/'
import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'
import Fuse from 'fuse.js'
import searchOptions from '../../config/search'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const response = await graphQLClient.request(
    gql`
      query {
        productCollection {
          items {
            name
            rrp
            price
            colour
            sizes
            slug
            popular
            gender
            image {
              url(transform: { width: 400 })
            }
            sys {
              id
            }
          }
        }
      }
    `
  )

  const data = formatResponseData(response.productCollection.items)
  const fuse = new Fuse(data, searchOptions)
  const searchData = fuse.search(String(query.search))
  const formattedData = formatSearchDataResponse(searchData)
  res.status(200).json({ data: formattedData })
}
