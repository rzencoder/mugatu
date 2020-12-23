import { gql } from 'graphql-request'

const GET_ALL_PRODUCTS_IDS = gql`
  query GetAllProductsIds {
    productCollection {
      items {
        slug
      }
    }
  }
`

export default GET_ALL_PRODUCTS_IDS
