import { useSearch } from '@/context/searchContext'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout } from '../components/layouts'
import { Products } from '../components'
import { Box, Flex } from '@chakra-ui/react'

export default function Search() {
  const { searchInput, searchProducts, setLoadSearchProducts } = useSearch()

  useEffect(() => {
    console.log('fetching')
    setLoadSearchProducts(true)
  }, [])

  return (
    <>
      <Head>
        <title>Search - {searchInput} | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {searchInput && (
          <Flex direction="column" justifyContent="center" width="100%" textAlign="center">
            <Box fontSize="20px">search results for</Box>
            <Box fontSize="28px" fontWeight="700">
              &ldquo;{searchInput}&ldquo;
            </Box>
          </Flex>
        )}
        <Products products={searchProducts} />
      </Layout>
    </>
  )
}
