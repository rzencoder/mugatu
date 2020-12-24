import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { graphQLClient } from '../../graphql/client'
import { GET_ALL_PRODUCTS_IDS, GET_PRODUCT_BY_SLUG } from '../../graphql/queries'
import { getAllProductsIds } from '../../utils'
import { Layout, FullProduct } from '../../components'
import { ProductData } from '../../types/productData'

export default function Product({ productData }: { productData: ProductData }): JSX.Element {
  return (
    <>
      <Head>
        <title>{productData.name} | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <FullProduct productData={productData} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await getAllProductsIds(GET_ALL_PRODUCTS_IDS)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  console.log('getstatic', params)
  const data = await graphQLClient.request(GET_PRODUCT_BY_SLUG, { id: params.id })
  return {
    props: {
      productData: data.productCollection.items[0],
    },
  }
}
