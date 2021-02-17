import { Item } from './item'

export interface BagItem extends Item {
  selectedSize: string
  quantity: number
}
