import { Flex, Button, useColorMode, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { useState } from 'react'
import { useGender } from '@/context/genderContext'
import FilterDesktop from './desktop'
import FilterMobile from './mobile'
import initialQuery from 'data/filterInitialQuery'
import options from 'data/filterOptions'
import { buildQueryUrl, updateQueryData, checkAnyFilterSelected } from '@/utils/filter'

export default function Filter(): JSX.Element {
  const [filterQuery, setFilterQuery] = useState(initialQuery)
  const [showFilter, setShowFilter] = useState(false)
  const { gender } = useGender()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
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
    const queryUrl = buildQueryUrl(filterQuery, gender)
    console.log(queryUrl)
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

  return (
    <Flex direction="column" position="relative">
      <Button
        maxWidth="140px"
        fontWeight="400"
        fontSize={['18px', null, '28px']}
        borderWidth="2px"
        padding={['10px 15px', null, 6]}
        borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
        onClick={() => handleOpen()}
      >
        {checkAnyFilterSelected(filterQuery, initialQuery) && '●'} Filter
      </Button>
      <FilterMobile
        isOpen={isOpen}
        onClose={onClose}
        options={options}
        updateQuery={updateQuery}
        getFilteredProducts={getFilteredProducts}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
      />
      {showFilter && (
        <FilterDesktop options={options} updateQuery={updateQuery} filterQuery={filterQuery} />
      )}
    </Flex>
  )
}
