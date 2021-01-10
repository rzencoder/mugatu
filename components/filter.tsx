import {
  Flex,
  Button,
  useColorMode,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  useDisclosure,
  useMediaQuery,
  DrawerFooter,
} from '@chakra-ui/react'
import { CheckIcon, ChevronDownIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useGender } from '@/context/genderContext'
import { Slider } from '.'

const options = [
  { name: 'product', items: ['all', 'coats', 'shirts'] },
  { name: 'colour', items: ['all', 'red', 'yellow'] },
  { name: 'size', items: ['all', '8', '10', 'L'] },
  { name: 'price', items: ['0'] },
]

const initialQuery = [
  { name: 'product', query: [] },
  { name: 'colour', query: [] },
  { name: 'size', query: [] },
  { name: 'price', query: [0, 200] },
]

const checkAnyFilterSelected = (query, initialQuery) => {
  return !(JSON.stringify(query) === JSON.stringify(initialQuery))
}

const displayTickOnSelected = (option, query, queries) => {
  const searchItem = queries.find((q) => q.name === option)
  if (!searchItem) return null
  if (searchItem.query.length === 0 && query === 'all') return <CheckIcon />
  if (searchItem.query.some((el) => el === query)) {
    return <CheckIcon />
  }
}

export default function Filter(): JSX.Element {
  const [showFilter, setShowFilter] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const { gender } = useGender()
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)')

  const clearFilter = () => {
    setSearchQuery(initialQuery)
  }

  const updateQuery = (filterType, newFilterItem, device = 'mobile') => {
    const newSearchQuery = searchQuery.map((el) => {
      if (el.name === filterType) {
        if (filterType === 'price') {
          return { ...el, query: newFilterItem }
        } else if (newFilterItem === 'all') {
          return { ...el, query: [] }
        } else if (el.query.includes(newFilterItem)) {
          const query = el.query.filter((item) => item !== newFilterItem)
          return { ...el, query }
        } else {
          return { ...el, query: [...el.query, newFilterItem] }
        }
      } else return el
    })
    setSearchQuery(newSearchQuery)
    if (device === 'desktop') {
      buildQuery(newSearchQuery)
    }
  }

  const buildQuery = (queryData = searchQuery) => {
    let query = queryData
      .filter((el) => el.query.length !== 0)
      .map((el) => {
        return `${el.name}=${el.query}&`
      })
    query = query.join('').slice(0, -1)
    query = `gender=${gender}&${query}`
    console.log(query)
    // fetch(`../api/filter?${query}`)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
  }

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
        maxWidth="120px"
        fontWeight="400"
        fontSize={['18px', null, '28px']}
        borderWidth="2px"
        padding={['10px 15px', null, 6]}
        borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
        onClick={() => handleOpen()}
      >
        {checkAnyFilterSelected(searchQuery, initialQuery) && '●'} Filter
      </Button>
      <FilterMobile
        isOpen={isOpen}
        onClose={onClose}
        options={options}
        updateQuery={updateQuery}
        buildQuery={buildQuery}
        searchQuery={searchQuery}
        clearFilter={clearFilter}
      />
      {showFilter && (
        <FilterDesktop options={options} updateQuery={updateQuery} searchQuery={searchQuery} />
      )}
    </Flex>
  )
}

const FilterDesktop = ({ options, updateQuery, searchQuery }) => {
  const { colorMode } = useColorMode()

  return (
    <Flex display={['none', null, 'flex']} padding="10px 0">
      {options.map((el) => (
        <Menu key={el.name}>
          <MenuButton
            as="button"
            p={2}
            value={el.name}
            style={{ fontSize: '18px', marginRight: '15px' }}
          >
            {el.name}
            <ChevronDownIcon />
          </MenuButton>
          <MenuList bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
            {el.items.map((item) => {
              if (el.name !== 'price') {
                return (
                  <MenuItem
                    display="flex"
                    justifyContent="space-between"
                    key={item}
                    onClick={() => updateQuery(el.name, item, 'desktop')}
                  >
                    <Box>{item}</Box>
                    <Box>{displayTickOnSelected(el.name, item, searchQuery)}</Box>
                  </MenuItem>
                )
              } else {
                const values = searchQuery.find((query) => query.name === el.name)
                return (
                  <Box key="price-range" p="20px  30px" minWidth="280px">
                    <Slider
                      handlePriceFilter={updateQuery}
                      device="desktop"
                      values={values.query}
                    />
                  </Box>
                )
              }
            })}
          </MenuList>
        </Menu>
      ))}
    </Flex>
  )
}

const FilterMobile = ({
  isOpen,
  onClose,
  options,
  updateQuery,
  buildQuery,
  searchQuery,
  clearFilter,
}) => {
  const { colorMode } = useColorMode()
  const [showFilterType, setShowFilterType] = useState('')

  const displaySelectedFilterItemsMobile = (option, queries) => {
    const item = [...queries].find((el) => el.name === option)
    let selectedOptions
    if (option === 'price') {
      if (item.query[0] === 0 && item.query[1] === 200) {
        return null
      } else {
        selectedOptions = '£' + item.query.join('-£')
      }
    } else {
      selectedOptions = item.query.join(', ')
    }
    return (
      <Box color="#aaa" fontSize="14px">
        {selectedOptions}
      </Box>
    )
  }

  const displayFilterType = (filterType) => {
    const option = options.find((el) => el.name === filterType)
    return (
      <>
        <DrawerHeader
          borderBottomWidth="10px"
          borderColor={colorMode === 'light' ? '#aaa' : '#555'}
          fontSize="24px"
          display="flex"
          alignItems="center"
          p="15px 10px"
        >
          <Button onClick={() => setShowFilterType('')} border="none" p="5px">
            <ArrowBackIcon />
          </Button>
          <Box>{filterType}</Box>
        </DrawerHeader>
        <DrawerBody>
          {option.items.map((item) => {
            if (option.name !== 'price') {
              return (
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  key={item}
                  fontSize="18px"
                  p="0"
                  m="5px 0"
                >
                  <Button
                    padding="0 10px 0 0"
                    textTransform="lowercase"
                    fontWeight="400"
                    fontSize="18px"
                    onClick={() => updateQuery(option.name, item)}
                  >
                    {item}
                  </Button>
                  <Box>{displayTickOnSelected(option.name, item, searchQuery)}</Box>
                </Flex>
              )
            } else {
              const values = searchQuery.find((query) => query.name === option.name)
              return (
                <Box key="price-range" p="20px  30px" minWidth="280px">
                  <Slider handlePriceFilter={updateQuery} device="mobile" values={values.query} />
                </Box>
              )
            }
          })}
        </DrawerBody>
      </>
    )
  }

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
            <DrawerCloseButton mt="10px" />
            {!showFilterType && (
              <>
                <DrawerHeader
                  borderBottomWidth="10px"
                  display="flex"
                  borderColor={colorMode === 'light' ? '#aaa' : '#555'}
                  fontSize="24px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>filter</Box>
                  {checkAnyFilterSelected(searchQuery, initialQuery) && (
                    <Button
                      fontSize="16px"
                      color="#999"
                      mr="40px"
                      fontWeight="400"
                      p="0"
                      textTransform="lowercase"
                      onClick={clearFilter}
                    >
                      clear all
                    </Button>
                  )}
                </DrawerHeader>

                <DrawerBody>
                  <Flex direction="column" alignItems="flex-start">
                    {options.map((option) => (
                      <Box key={`filter-select-mobile-${option.name}`}>
                        <Button
                          border="none"
                          textTransform="lowercase"
                          padding="10px 0"
                          margin="5px 0"
                          justifyContent="flex-start"
                          fontSize="18px"
                          onClick={() => setShowFilterType(option.name)}
                        >
                          {option.name}
                        </Button>
                        <Box>{displaySelectedFilterItemsMobile(option.name, searchQuery)}</Box>
                      </Box>
                    ))}
                  </Flex>
                </DrawerBody>
              </>
            )}
            {showFilterType && <>{displayFilterType(showFilterType)}</>}
            <DrawerFooter justifyContent="center">
              <Button
                borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
                onClick={() => {
                  buildQuery()
                  onClose()
                }}
              >
                Filter Items
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
