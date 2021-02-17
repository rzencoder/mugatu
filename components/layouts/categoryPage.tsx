import { Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { Layout, Catalog } from './'

interface CategoryPageProps {
  title: string
  productPage: string
}

export default function CategoryPage({ title, productPage }: CategoryPageProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title} | Mugatu</title>
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
          {title}
        </Heading>
        <Catalog productPage={productPage} />
      </Layout>
    </>
  )
}
