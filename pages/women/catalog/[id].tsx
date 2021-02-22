import { GetStaticProps, GetStaticPaths } from 'next'
import { graphQLClient } from '@/graphql/client'
import { GET_ALL_PRODUCTS_IDS, GET_PRODUCT_BY_SLUG } from '@/graphql/queries'
import { formatResponseData, getAllProductsIds } from '../../../utils'
import { FullProduct } from '../../../components'
import { Layout, Meta } from '@/components/layouts'
import capitaliseFirstLetter from '@/utils/helpers/capitaliseFirstLetter'
import { Item } from '@/types/item'

export default function Product({ item }: { item: Item }): JSX.Element {
  return (
    <>
      <Meta title={`${capitaliseFirstLetter(item.name)} | Mugatu`} description={item.name} />
      <Layout>
        <FullProduct item={item} />
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProductsIds(GET_ALL_PRODUCTS_IDS, 'female')
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await graphQLClient.request(GET_PRODUCT_BY_SLUG, { id: params.id })
  const formattedData = formatResponseData(data.productCollection.items)
  return {
    props: {
      item: formattedData[0],
    },
  }
}
