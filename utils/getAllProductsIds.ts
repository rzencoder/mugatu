import { graphQLClient } from '@/graphql/client'

interface ProductIdsInterface {
  params: {
    id: string
  }
}

export default async function getAllProductsIds(
  query: string,
  gender: string
): Promise<Array<ProductIdsInterface>> {
  const response = await graphQLClient.request(query, { gender: gender })
  return response.productCollection.items.map((product: { slug: string }) => {
    return {
      params: {
        id: product.slug,
      },
    }
  })
}
