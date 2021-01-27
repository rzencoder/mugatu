import { formatResponseData } from '../../utils/'
import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'
import Fuse from 'fuse.js'

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 0,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: ['name', 'colour', 'gender'],
}

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
  const fuse = new Fuse(data, options)
  const search = String(query.search)
  const result = fuse.search(search)
  const f = result.reduce(function (acc, item, index) {
    return acc.concat(
      Object.keys(item).map(function (key) {
        return item[key]
      })
    )
  }, [])
  const formatted = f.filter((el, index) => index % 2 === 0)
  console.log(formatted)
  res.status(200).json({ data: formatted })
}
