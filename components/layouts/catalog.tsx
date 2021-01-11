import { Flex, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Products, Sort, Loader, Filter } from '..'
import { useGender } from '../../context/genderContext'

export default function Catalog({ pageGender }) {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const { setGender } = useGender()

  useEffect(() => {
    setGender(pageGender)
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
      {loading ? <Loader /> : <Products gender={pageGender} products={products} />}
    </Flex>
  )
}
