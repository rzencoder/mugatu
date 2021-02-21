import { Products, Sort } from '..'
import SearchPageFilter from '@/components/filter/searchPage'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import initialQuery from '@/data/filterInitialQuery'
import { filterSearchResults } from '@/utils/filter'
import { sortProducts } from '../../utils/'
import { Item } from '@/types/item'

interface SearchProps {
  products: Item[]
  query: string
}

const SearchPageLayout = ({ products, query }: SearchProps): JSX.Element => {
  const [filterData, setFilterData] = useState(initialQuery)
  const [sortValue, setSortValue] = useState('popularity')
  const [filteredProducts, setFilteredProducts] = useState([...products])

  useEffect(() => {
    const result = filterSearchResults(filterData, products)
    setFilteredProducts(result)
  }, [products, filterData])

  return (
    <Flex
      direction="column"
      justifyContent="center"
      width="100%"
      textAlign="center"
      minHeight="150px"
      p="20px 0 5px"
    >
      {filteredProducts && query ? (
        <>
          <Box maxWidth="400px" margin={['0 auto', null, '0 auto -70px']}>
            <Box fontSize="20px">search results for</Box>
            <Box fontSize="28px" fontWeight="600">
              &ldquo;{query}&ldquo;
            </Box>
            <Box p="10px 0 0">{`${filteredProducts.length} item${
              filteredProducts.length !== 1 ? 's' : ''
            } found`}</Box>
          </Box>
          <Flex justify="space-between" align="flex-start" padding={['5px', null, '15px']}>
            <SearchPageFilter setFilterData={setFilterData} />
            <Sort sortValue={sortValue} setSortValue={setSortValue} />
          </Flex>
          <Products products={sortProducts(filteredProducts, sortValue)} />
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
  )
}

export default SearchPageLayout
