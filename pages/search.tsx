import { useSearch } from '@/context/searchContext'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout } from '../components/layouts'
import { Products } from '../components'
import { Box, Flex } from '@chakra-ui/react'

export default function Search(): JSX.Element {
  const { searchInput, searchProducts, setLoadSearchProducts } = useSearch()

  useEffect(() => {
    setLoadSearchProducts(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Search - {searchInput} | Mugatu</title>
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
          {searchInput && (
            <>
              <Box fontSize="20px">search results for</Box>
              <Box fontSize="28px" fontWeight="600">
                &ldquo;{searchInput}&ldquo;
              </Box>
              {searchProducts.length > 0 && <Box p="10px 0 0">{searchProducts.length} items</Box>}
            </>
          )}
        </Flex>
        <Products products={searchProducts} />
      </Layout>
    </>
  )
}
