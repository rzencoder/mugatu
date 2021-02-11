import { Flex, Button, useColorMode, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import FilterDesktop from './desktop'
import FilterMobile from './mobile'
import initialQuery from 'data/filterInitialQuery'
import options from 'data/filterOptions'
import { buildQueryUrl, updateQueryData, checkAnyFilterSelected } from '@/utils/filter'
import { useProducts } from '@/context/productsContext'
import { useRouter } from 'next/dist/client/router'

export default function Filter(): JSX.Element {
  const [filterQuery, setFilterQuery] = useState(initialQuery)
  const [showFilter, setShowFilter] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
  // 767px is the third breakpoint with the chakra styling
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)')
  const { getFilteredProduct, gender } = useProducts()
  const router = useRouter()

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
    const result = getFilteredProduct(`../api/filter?${queryUrl}&`)
    console.log(result)
    // fetch(`../api/filter?${queryUrl}`)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
  }

  // Handling whether a hidden menu or on display flex box is displayed on different screen sizes
  const handleOpen = () => {
    if (isLargerThan767) {
      setShowFilter(!showFilter)
    } else {
      onOpen()
    }
  }

  useEffect(() => {
    // const path = router.asPath.split('?')
  }, [])

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
        options={options[gender === 'female' ? 0 : 1]}
        updateQuery={updateQuery}
        getFilteredProducts={getFilteredProducts}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      {showFilter && (
        <FilterDesktop
          options={options[gender === 'female' ? 0 : 1]}
          updateQuery={updateQuery}
          filterQuery={filterQuery}
        />
      )}
    </Flex>
  )
}
