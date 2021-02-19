import { Item } from '@/types/item'

interface Props {
  item: Item
  refIndex: number
}

const formatSearchDataResponse = (data: Props[]): Item[] => {
  return data.map((obj) => {
    delete obj.refIndex
    return obj.item
  })
}

export default formatSearchDataResponse
