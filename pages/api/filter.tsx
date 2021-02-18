import { formatResponseData } from '../../utils/'
import { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../graphql/client'
import { GET_PRODUCTS_BY_GENDER } from 'graphql/queries'
import { Item } from '@/types/item'

interface FilterProps {
  product?: string
  size?: string
  colour?: string
  gender?: string
  price?: string
}

const allowedFilterParams = ['gender', 'size', 'colour', 'product', 'price']

const checkFilterParams = (query: FilterProps) => {
  const keys = Object.keys(query)
  let error = false
  keys.forEach((key) => {
    const filteredParams = allowedFilterParams.filter((el) => el === key)
    if (filteredParams.length === 0) error = true
    return filteredParams
  })
  return !error
}

interface FilterInterface {
  product?: string[]
  size?: string[]
  colour?: string[]
  gender?: string[]
  price?: string[]
}

const convertObjPropsToArray = (obj: FilterProps): FilterInterface => {
  const newObj = {}
  Object.entries(obj).forEach(([key, val]) => (newObj[key] = val.toString().split(',')))
  return newObj
}

const filterItems = (query: FilterProps, items: Item[]) => {
  console.log(query)
  const formattedQuery = convertObjPropsToArray(query)
  let filteredItems = [...items]
  if (formattedQuery.product) {
    filteredItems = filteredItems.filter((item) => {
      return formattedQuery.product.some((el) => el === item.category)
    })
  }
  if (formattedQuery.colour) {
    filteredItems = filteredItems.filter((item) => {
      return formattedQuery.colour.some((el) => el === item.colour)
    })
  }
  if (formattedQuery.size) {
    filteredItems = filteredItems.filter((item) => {
      const itemSizes = item.sizes.filter((el) => {
        return formattedQuery.size.some((querySize) => querySize === el.size)
      })
      if (itemSizes && itemSizes.some((el) => el.stock > 0)) return item
    })
  }
  if (formattedQuery.price) {
    filteredItems = filteredItems.filter((item) => {
      return (
        item.price > parseInt(formattedQuery.price[0]) &&
        item.price < parseInt(formattedQuery.price[1])
      )
    })
  }
  return filteredItems
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  if (!checkFilterParams(query)) return res.status(400).json({ error: 'error' })
  const response = await graphQLClient.request(GET_PRODUCTS_BY_GENDER, { gender: query.gender })
  const items = formatResponseData(response.productCollection.items)
  const filteredItems = filterItems(query, items)
  res.status(200).json({ products: filteredItems })
}
