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
    const path = router.pathname.split('/')
    let category = path[path.length - 1] !== 'catalog' ? path[path.length - 1] : ''
    if (category && category !== 'jeans') {
      if (category[category.length - 1] === 's') {
        if (category[category.length - 2] === 'e') {
          category = category.slice(0, -2)
        } else {
          category = category.slice(0, -1)
        }
      }
    }
    if (category) {
      category = `product=${category}`
    }
    const result = getFilteredProduct(`../api/filter?${category}&${queryUrl}&`)
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

  const getOptions = (options, router, gender) => {
    const optionsForGender = gender === 'female' ? options[0] : options[1]
    const path = router.pathname.split('/')
    if (path[path.length - 1] !== 'catalog') {
      return optionsForGender.filter((el) => el.name !== 'product')
    }
    return optionsForGender
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
        options={getOptions(options, router, gender)}
        updateQuery={updateQuery}
        getFilteredProducts={getFilteredProducts}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      {showFilter && (
        <FilterDesktop
          options={getOptions(options, router, gender)}
          updateQuery={updateQuery}
          filterQuery={filterQuery}
        />
      )}
    </Flex>
  )
}
