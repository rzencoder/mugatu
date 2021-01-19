import { gql } from 'graphql-request'
import { QueryDocumentKeys } from 'graphql/language/visitor'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'

interface searchParams {
  product?: string
  size?: string
  colour?: string
  gender?: string
}

const allowedSearchParams = ['gender', 'size', 'colour', 'product', 'price']

const checkSearchParams = (query) => {
  const keys = Object.keys(query)
  let error = false
  keys.forEach((key) => {
    const a = allowedSearchParams.filter((el) => el === key)
    if (a.length === 0) error = true
    return a
  })
  return !error
}

const convertObjPropsToArray = (obj) => {
  const newObj = {}
  Object.entries(obj).forEach(([key, val]) => (newObj[key] = val.toString().split(',')))
  return newObj
}

const filterItems = (query, items) => {
  query = convertObjPropsToArray(query)
  let filteredItems = [...items]
  if (query.product) {
    filteredItems = filteredItems.filter((item) => {
      return query.product.some((el) => el === item.category)
    })
  }
  if (query.colour) {
    filteredItems = filteredItems.filter((item) => {
      return query.colour.some((el) => el === item.colour)
    })
  }
  if (query.size) {
    filteredItems = filteredItems.filter((item) => {
      const itemSizes = item.sizes.filter((el) => {
        return query.size.some((querySize) => querySize === el.size)
      })
      if (itemSizes && itemSizes.some((el) => el.stock > 0)) return item
    })
  }
  if (query.price) {
    filteredItems = filteredItems.filter((item) => {
      return (
        parseFloat(item.price) > parseInt(query.price[0]) &&
        parseFloat(item.price) < parseInt(query.price[1])
      )
    })
  }

  return filteredItems
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  if (!checkSearchParams(query)) return res.status(400).json({ error: 'error' })
  console.log(query)

  const response = await graphQLClient.request(
    gql`
      query GetByGender($gender: String!) {
        productCollection(where: { gender: $gender }) {
          items {
            id
            name
            slug
            price
            rrp
            category
            colour
            sizes
            popular
            image {
              url(transform: { width: 400 })
            }
          }
        }
      }
    `,
    { gender: query.gender }
  )

  const items = response.productCollection.items
  const filteredItems = filterItems(query, items)

  res.status(200).json({ data: filteredItems })
}
