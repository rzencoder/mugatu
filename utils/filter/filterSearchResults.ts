import { FilterQuery } from '@/types/filterQuery'
import { Item } from '@/types/item'

const filterSearchResults = (queries: FilterQuery[], items: Item[]): Item[] => {
  let filteredItems = [...items]
  queries.forEach((el) => {
    if (el.query.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        if (el.name === 'price') {
          if (el.query[0] === '0' && el.query[1] === '150') {
            return true
          } else {
            return item.price > parseInt(el.query[0]) && item.price < parseInt(el.query[1])
          }
        } else if (el.name === 'size') {
          const itemSizes = item.sizes.filter((itemSize) => {
            return el.query.some((querySize) => querySize === itemSize.size)
          })
          if (itemSizes && itemSizes.some((el) => el.stock > 0)) return item
        } else {
          let itemQuery = ''
          if (el.name === 'gender') {
            itemQuery = item.gender === 'female' ? 'women' : 'men'
          } else if (el.name === 'product') {
            itemQuery = item.category
          } else if (el.name === 'colour') {
            itemQuery = item.colour
          }
          return el.query.some((el) => el === itemQuery)
        }
      })
    }
  })
  return filteredItems
}

export default filterSearchResults
