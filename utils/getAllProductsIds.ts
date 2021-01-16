import { graphQLClient } from './../graphql/client'

interface ProductIds {
  params: {
    id: string
  }
}

export default async function getAllProductsIds(query: string, gender: string) {
  const response = await graphQLClient.request(query, { gender: gender })
  return response.productCollection.items.map((product) => {
    return {
      params: {
        id: product.slug,
      },
    }
  })
}
