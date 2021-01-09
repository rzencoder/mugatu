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

export default function Filter(): JSX.Element {
  const [showFilter, setShowFilter] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const { gender } = useGender()
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)')

  const updateQuery = (filterType, newFilterItem) => {
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
    buildQuery(newSearchQuery)
  }

  const buildQuery = (queryData) => {
    let query = queryData
      .filter((el) => el.query.length !== 0)
      .map((el) => {
        return `${el.name}=${el.query}&`
      })
    query = query.join('').slice(0, -1)
    query = `gender=${gender}&${query}`
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
        fontSize="20px"
        borderWidth="1px"
        borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
        onClick={() => handleOpen()}
      >
        Filter
      </Button>
      <FilterMobile isOpen={isOpen} onClose={onClose} />
      {showFilter && (
        <FilterDesktop options={options} updateQuery={updateQuery} searchQuery={searchQuery} />
      )}
    </Flex>
  )
}

const FilterDesktop = ({ options, updateQuery, searchQuery }) => {
  const { colorMode } = useColorMode()

  const displayTickOnSelected = (type, query) => {
    const searchItem = searchQuery.find((q) => q.name === type)
    if (!searchItem) return null
    if (searchItem.query.length === 0 && query === 'all') return <CheckIcon />
    if (searchItem.query.some((el) => el === query)) {
      return <CheckIcon />
    }
  }

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
            {el.name} <ChevronDownIcon />
          </MenuButton>
          <MenuList bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
            {el.items.map((item) => {
              if (el.name !== 'price') {
                return (
                  <MenuItem
                    display="flex"
                    justifyContent="space-between"
                    key={item}
                    onClick={() => updateQuery(el.name, item)}
                  >
                    <Box>{item}</Box>
                    <Box>{displayTickOnSelected(el.name, item)}</Box>
                  </MenuItem>
                )
              } else {
                return (
                  <Box key="price-range" p="20px  30px" minWidth="280px">
                    <Slider handlePriceFilter={updateQuery} />
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

const FilterMobile = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode()
  const [showFilterType, setShowFilterType] = useState('')

  const displayFilterType = (filterType) => {
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
          <div>{filterType}</div>
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
                  borderColor={colorMode === 'light' ? '#aaa' : '#555'}
                  fontSize="24px"
                >
                  filter
                </DrawerHeader>
                <DrawerBody>
                  <Button onClick={() => setShowFilterType('product')}>Product</Button>
                  <p>Colour</p>
                  <p>Size</p>
                </DrawerBody>
              </>
            )}
            {showFilterType && <>{displayFilterType('product')}</>}
            <DrawerFooter>
              <Button>Filter Items</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
