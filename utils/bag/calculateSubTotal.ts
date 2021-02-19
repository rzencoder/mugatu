import { Item } from '@/types/item'

export interface BagItem extends Item {
  selectedSize?: string
  quantity?: number
}

const calculateSubTotal = (bag: BagItem[]): number => {
  const total = bag.reduce((acc, cur) => {
    return cur.price * cur.quantity + acc
  }, 0)
  return parseFloat(total.toFixed(2))
}

export default calculateSubTotal
