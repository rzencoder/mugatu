export default interface ProductData {
  name: string
  image: string
  price: number
  rrp: number
  colour: string
  image: {
    url: string
  }
  sizes: [number]
}
