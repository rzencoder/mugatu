import { gql } from 'graphql-request'

const GET_ALL_PRODUCTS_IDS = gql`
  query getProductBySlug($gender: String!) {
    productCollection(where: { gender: $gender }) {
      items {
        slug
      }
    }
  }
`

export default GET_ALL_PRODUCTS_IDS
