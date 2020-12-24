export interface Image {
  url: string
}

export interface ProductData {
  name: string
  price: number
  rrp: number
  colour: string
  image: {
    [key: string]: Image
  }
  sizes: [number]
}
