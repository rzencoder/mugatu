import { gql } from 'graphql-request'

const GET_SEARCH_DATA = gql`
  query GetSearchData {
    productCollection {
      items {
        name
        colour
        slug
        gender
      }
    }
  }
`

export default GET_SEARCH_DATA
