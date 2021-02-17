export interface Item {
  id: string
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
}
