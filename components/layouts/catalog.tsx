import { Flex, Box } from '@chakra-ui/react'
import { Products, Sort, Filter, Loader } from '..'
import useSWR from 'swr'
import { useRouter } from 'next/dist/client/router'
import { getPageGender, sortProducts } from '../../utils/'
import { useState } from 'react'
import initialQuery from 'data/filterInitialQuery'
import { buildQueryUrl } from '@/utils/filter'
import useProducts from 'hooks/useProducts'

const formatQuery = (productPage, gender, filterData) => {
  const query = filterData
    .filter((el) => el.query.length !== 0)
    .map((el) => {
      console.log(el)
      if (el.name === 'product' && productPage !== 'home') {
        return `$product=${productPage}&`
      } else {
        return `${el.name}=${el.query}&`
      }
    })
  const filterQuery = query.join('').slice(0, -1)
  const urlQuery = `gender=${gender}&${filterQuery}`
  if (urlQuery.includes(productPage) || productPage === 'home') {
    return urlQuery
  } else {
    return `${urlQuery}&product=${productPage}`
  }
}

export default function Catalog({ productPage }) {
  const [filterData, setFilterData] = useState(initialQuery)
  const [sortValue, setSortValue] = useState('popularity')
  const router = useRouter()
  const path = router.pathname
  const gender = getPageGender(path)
  const { data, loading, isError } = useProducts(formatQuery(productPage, gender, filterData))
  console.log(data)
  console.log('catalog')

  return (
    <Flex
      margin={['10px 10px', '10px 20px', '10px auto']}
      padding={['2px', null, null, '10px']}
      maxWidth={['1200px']}
      direction="column"
    >
      {data && data.products && (
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
        <Filter filterData={filterData} setFilterData={setFilterData} />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
      </Flex>
      {!data ? <Loader /> : <Products products={sortProducts(data.products, sortValue)} />}
    </Flex>
  )
}
