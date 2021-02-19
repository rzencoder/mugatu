import { Item } from '@/types/item'

const sortProducts = (products: Item[], sortType: string): Item[] => {
  const sortedProducts = [...products]
  if (sortType === 'popularity') {
    return sortedProducts.sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1))
  } else if (sortType === 'low') {
    return sortedProducts.sort((a, b) => a.price - b.price)
  } else if (sortType === 'high') {
    return sortedProducts.sort((a, b) => b.price - a.price)
  } else {
    return sortedProducts.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
      return -1
    })
  }
}

export default sortProducts
