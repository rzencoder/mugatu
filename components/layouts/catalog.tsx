import { Flex, Box } from '@chakra-ui/react'
import { Products, Sort, Filter, Loader } from '..'
import { useRouter } from 'next/dist/client/router'
import { getPageGender, sortProducts } from '../../utils/'
import { useState } from 'react'
import initialQuery from '@/data/filterInitialQuery'
import { buildQueryUrl } from '@/utils/filter'
import useProducts from 'hooks/useProducts'

interface CatalogProps {
  productPage: string
}

export default function Catalog({ productPage }: CatalogProps): JSX.Element {
  const [filterData, setFilterData] = useState(initialQuery)
  const [sortValue, setSortValue] = useState('popularity')
  const router = useRouter()
  const gender = getPageGender(router.pathname)
  const { data, isLoading } = useProducts(buildQueryUrl(productPage, gender, filterData))

  return (
    <Flex
      margin={['10px 10px', '10px 20px', '10px auto']}
      padding={['2px', null, null, '10px']}
      maxWidth={['1200px']}
      direction="column"
    >
      {!isLoading && (
        <Box
          width="180px"
          textAlign="center"
          margin={['0 auto', null, '0 auto -55px']}
          pt={[0, null, '10px']}
          fontSize={['18px', null, '20px', '22px']}
        >
          {`${data.products.length} item${data.products.length !== 1 ? 's' : ''} found`}
        </Box>
      )}
      <Flex justify="space-between" align="flex-start" padding={['5px', null, '15px']}>
        <Filter setFilterData={setFilterData} />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
      </Flex>
      {isLoading ? <Loader /> : <Products products={sortProducts(data.products, sortValue)} />}
    </Flex>
  )
}
