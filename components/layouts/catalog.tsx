import { Flex, Box } from '@chakra-ui/react'
import { Products, Sort, Filter } from '..'

export default function Catalog({ products }) {
  console.log('catalog')
  return (
    <Flex
      margin={['10px 10px', '10px 20px', '10px auto']}
      padding={['2px', null, null, '10px']}
      maxWidth={['1200px']}
      direction="column"
    >
      {products && (
        <Box
          width="180px"
          textAlign="center"
          margin={['0 auto', null, '0 auto -55px']}
          pt={[0, null, '10px']}
          fontSize={['18px', null, '20px', '22px']}
        >
          {`${products.length} item${products.length !== 1 ? 's' : ''} found`}
        </Box>
      )}
      <Flex justify="space-between" align="flex-start" padding={['5px', null, '15px']}>
        <Filter />
        <Sort />
      </Flex>
      <Products products={products} />
    </Flex>
  )
}
