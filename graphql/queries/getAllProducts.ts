import { gql } from 'graphql-request'

const GET_ALL_PRODUCTS = gql`
  query {
    productCollection {
      items {
        name
        rrp
        price
        colour
        sizes
        slug
        popular
        category
        gender
        image {
          url(transform: { width: 400 })
        }
        sys {
          id
        }
      }
    }
  }
`

export default GET_ALL_PRODUCTS
