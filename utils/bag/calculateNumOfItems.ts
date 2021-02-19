import { Item } from '@/types/item'

export interface BagItem extends Item {
  selectedSize?: string
  quantity?: number
}

const calculateNumOfItems = (bag: BagItem[]): number => {
  return bag.reduce((acc, cur) => {
    return acc + cur.quantity
  }, 0)
}

export default calculateNumOfItems
