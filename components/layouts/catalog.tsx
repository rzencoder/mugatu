import { Flex, Box } from '@chakra-ui/react'
import { Products, Sort, Filter, Loader } from '..'
import useSWR from 'swr'
import { useRouter } from 'next/dist/client/router'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const getPageGender = (path) => {
  return path.includes('women') ? 'female' : 'male'
}

const formatQuery = (productPage, gender) => {
  const query = `/api/filter?gender=${gender}`
  if (productPage === 'home') {
    return query
  } else {
    return `${query}&product=${productPage}`
  }
}

export default function Catalog({ productPage }) {
  const router = useRouter()
  const path = router.pathname
  const gender = getPageGender(path)
  const { data, error } = useSWR(formatQuery(productPage, gender), fetcher)
  console.log(data)

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
        <Filter />
        <Sort />
      </Flex>
      {!data ? <Loader /> : <Products products={data.products} />}
    </Flex>
  )
}
