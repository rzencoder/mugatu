import { Item } from '@/types/item'

interface Props {
  name: string
  rrp: number
  price: number
  colour: string
  slug: string
  gender: string
  category: string
  popular: boolean
  sizes: {
    size: string
    stock: number
  }[]
  image: {
    url: string
  }
  sys: {
    id: string
  }
}

const formatResponseData = (data: Props[]): Item[] => {
  return data.map((item) => {
    const newObj = { ...item, id: item.sys.id }
    delete newObj['sys']
    return newObj
  })
}

export default formatResponseData
