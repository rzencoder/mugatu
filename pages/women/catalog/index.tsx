import { Flex, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Layout, Products, Sort, Loader, Filter } from '../../../components'
import { useGender } from '../../../context/genderContext'

export default function Catelog() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const { setGender } = useGender()

  useEffect(() => {
    setGender('female')
    async function fetchProducts() {
      setLoading(true)
      const response = await fetch(`../api/search?gender=female`)
      const { data } = await response.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          margin={['10px 10px', '10px 20px', '10px auto']}
          padding={['2px', null, null, '10px']}
          maxWidth={['1200px']}
          direction="column"
        >
          {products && products.length && (
            <Box
              width="180px"
              textAlign="center"
              margin={['0 auto', null, '0 auto -55px']}
              pt={[0, null, '10px']}
              fontSize={['18px', null, '20px', '22px']}
            >
              {`${products.length} items found`}
            </Box>
          )}
          <Flex justify="space-between" align="flex-start" padding={['5px', null, '15px']}>
            <Filter />
            <Sort />
          </Flex>
          {loading ? <Loader /> : <Products gender="female" products={products} />}
        </Flex>
      </Layout>
    </>
  )
}
