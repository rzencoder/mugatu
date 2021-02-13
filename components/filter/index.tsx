import { Flex, Button, useColorMode, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { useState } from 'react'
import FilterDesktop from './desktop'
import FilterMobile from './mobile'
import initialQuery from 'data/filterInitialQuery'
import options from 'data/filterOptions'
import {
  buildQueryUrl,
  updateQueryData,
  checkAnyFilterSelected,
  getFilterOptions,
} from '@/utils/filter'
import { useProducts } from '@/context/productsContext'
import { useRouter } from 'next/dist/client/router'

export default function Filter(): JSX.Element {
  const [filterQuery, setFilterQuery] = useState(initialQuery)
  const [showFilter, setShowFilter] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
  const { getFilteredProduct, gender } = useProducts()
  const router = useRouter()
  // 767px is the third breakpoint with the chakra styling
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)')

  // Update filter object on user select. If desktop user then also fetch the products else on mobile only fetch when the user clicks the button to confirm to view filtered products
  const updateQuery = (filterType, newFilterItem, device = 'mobile') => {
    const newSearchQuery = updateQueryData(filterType, newFilterItem, filterQuery)
    setFilterQuery(newSearchQuery)
    if (device === 'desktop') {
      getFilteredProducts(newSearchQuery)
    }
  }

  // Fetch filtered products from api
  const getFilteredProducts = (filterQuery) => {
    const queryUrl = buildQueryUrl(filterQuery)
    const path = router.pathname.split('/')
    const category = formatCategoryFilterQuery(path)
    getFilteredProduct(`../api/filter?${category}&${queryUrl}&`)
  }

  // Handling whether a hidden menu or on display flex box is displayed on different screen sizes
  const handleOpen = () => {
    if (isLargerThan767) {
      setShowFilter(!showFilter)
    } else {
      onOpen()
    }
  }

  return (
    <Flex direction="column" position="relative">
      <Button
        maxWidth="140px"
        fontWeight="400"
        fontSize={['18px', null, '28px']}
        borderWidth="2px"
        padding={['10px 15px', null, 6]}
        borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
        _hover={{
          bg: colorMode === 'light' ? 'mainBlackHover' : 'mainWhiteHover',
        }}
        onClick={() => handleOpen()}
      >
        {checkAnyFilterSelected(filterQuery, initialQuery) && '●'} Filter
      </Button>
      <FilterMobile
        isOpen={isOpen}
        onClose={onClose}
        options={getFilterOptions(options, router, gender)}
        updateQuery={updateQuery}
        getFilteredProducts={getFilteredProducts}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      {showFilter && (
        <FilterDesktop
          options={getFilterOptions(options, router, gender)}
          updateQuery={updateQuery}
          filterQuery={filterQuery}
        />
      )}
    </Flex>
  )
}
