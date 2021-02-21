import Head from 'next/head'
import { Layout } from '../components/layouts'
import { Products } from '../components'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { formatResponseData, formatSearchDataResponse } from '../utils/'
import { graphQLClient } from '../graphql/client'
import Fuse from 'fuse.js'
import searchOptions from '../config/search'
import { GET_ALL_PRODUCTS } from 'graphql/queries'
import { Item } from '@/types/item'
import { GetServerSideProps } from 'next'

interface SearchProps {
  products: Item[]
  query: string
}

export default function Search({ products, query }: SearchProps): JSX.Element {
  console.log(products)
  return (
    <>
      <Head>
        <title>Search - {query} | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          direction="column"
          justifyContent="center"
          width="100%"
          textAlign="center"
          minHeight="150px"
          p="20px 0 5px"
        >
          {products && query ? (
            <>
              <Box fontSize="20px">search results for</Box>
              <Box fontSize="28px" fontWeight="600">
                &ldquo;{query}&ldquo;
              </Box>
              <Box p="10px 0 0">{`${products.length} item${
                products.length !== 1 ? 's' : ''
              } found`}</Box>
            </>
          ) : (
            <Flex
              direction="column"
              textAlign="center"
              margin="80px auto"
              max-width="600px"
              padding="0 20px"
            >
              <Heading as="h3" fontWeight="600" m="20px 0">
                no search term found
              </Heading>
              <Box fontSize="18px">use the search bar above to search the catalog</Box>
            </Flex>
          )}
        </Flex>
        <Products products={products} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.search) {
    return { props: { products: [], query: '' } }
  }
  try {
    const response = await graphQLClient.request(GET_ALL_PRODUCTS)
    const data = formatResponseData(response.productCollection.items)
    const fuse = new Fuse(data, searchOptions)
    const searchData = [...fuse.search(String(query.search))]
    const formattedData = formatSearchDataResponse(searchData)
    return { props: { products: formattedData, query: query.search } }
  } catch (error) {
    console.log(error)
    return { props: { products: [], query: '' } }
  }
}
