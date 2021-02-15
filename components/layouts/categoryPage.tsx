import { Loader } from '..'
import { useProducts } from '@/context/productsContext'
import { Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout, Catalog } from './'

export default function CategoryPage({ gender, title, query }) {
  const { loading, getFilteredProduct } = useProducts()

  useEffect(() => {
    getFilteredProduct(`../api/filter?product=${query}&`)
  }, [])

  return (
    <>
      <Head>
        <title>
          {gender}&apos;s {title} | Mugatu
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading
          as="h2"
          p={['25px 10px 10px', '15px 10px 10px']}
          textTransform="lowercase"
          textAlign="center"
          fontWeight="500"
        >
          {gender}&apos;s {title}
        </Heading>
        <Catalog />
      </Layout>
    </>
  )
}
