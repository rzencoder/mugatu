import { gql } from 'graphql-request'

const GET_PRODUCTS_BY_GENDER = gql`
  query GetByGender($gender: String!) {
    productCollection(where: { gender: $gender }) {
      items {
        name
        rrp
        price
        colour
        sizes
        slug
        popular
        gender
        category
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

export default GET_PRODUCTS_BY_GENDER
