import { gql } from 'graphql-request'

const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySlug($id: String!) {
    productCollection(where: { slug: $id }) {
      items {
        id
        name
        rrp
        price
        colour
        sizes
        slug
        popular
        image {
          url
        }
      }
    }
  }
`

export default GET_PRODUCT_BY_SLUG
