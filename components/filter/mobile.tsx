import {
  Flex,
  Button,
  useColorMode,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Slider from './slider'
import initialQuery from 'data/filterInitialQuery'
import {
  checkAnyFilterSelected,
  displayTickOnSelected,
  displaySelectedFilterItemsMobile,
} from '@/utils/filter'
import { FilterOptions } from '@/types/filterOptions'
import { FilterQuery } from '@/types/filterQuery'

interface MobileProps {
  isOpen: boolean
  onClose: () => void
  options: FilterOptions[]
  updateQuery: (filterType: string, newFilterItem: string, device?: string) => void
  setFilterData: (filterData: FilterQuery[]) => void
  filterQuery: FilterQuery[]
  setFilterQuery: (filterQuery: FilterQuery[]) => void
}

//Display filter component in a mobile friendly menu on smaller screen sizes
const Mobile = ({
  isOpen,
  onClose,
  options,
  updateQuery,
  setFilterData,
  filterQuery,
  setFilterQuery,
}: MobileProps): JSX.Element => {
  const [showFilterType, setShowFilterType] = useState('')
  const { colorMode } = useColorMode()

  //Display available options to filter from chosen category
  const displayFilterType = (filterType: string) => {
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
          <Button variant="transparentBg" p="5px" onClick={() => setShowFilterType('')}>
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
                    variant="transparentBg"
                    padding="0 10px 0 0"
                    fontSize="18px"
                    onClick={() => updateQuery(option.name, item)}
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <Box>{item}</Box>
                  </Button>
                  <Box>
                    {displayTickOnSelected(option.name, item, filterQuery) && <CheckIcon />}
                  </Box>
                </Flex>
              )
            } else {
              const values = filterQuery.find((query) => query.name === option.name)
              const formattedValues = [parseInt(values.query[0]), parseInt(values.query[1])]
              return (
                <Box key="price-range" p="20px  30px" minWidth="280px">
                  <Slider
                    handlePriceFilter={updateQuery}
                    device="mobile"
                    values={formattedValues}
                  />
                </Box>
              )
            }
          })}
          <Flex justifyContent="center">
            <Button
              borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
              margin="20px"
              onClick={() => {
                setFilterData(filterQuery)
                onClose()
              }}
            >
              Filter Items
            </Button>
          </Flex>
        </DrawerBody>
      </>
    )
  }

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
            <DrawerCloseButton variant="transparentBg" mt="10px" />
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
                  {checkAnyFilterSelected(filterQuery, initialQuery) && (
                    <Button
                      variant="transparentBg"
                      fontSize="16px"
                      color="#999"
                      mr="40px"
                      onClick={() => setFilterQuery(initialQuery)}
                    >
                      clear all
                    </Button>
                  )}
                </DrawerHeader>

                <DrawerBody display="flex" flexDirection="column" justifyContent="space-between">
                  <Flex direction="column" alignItems="flex-start">
                    {options.map((option) => (
                      <Box key={`filter-select-mobile-${option.name}`}>
                        <Button
                          variant="transparentBg"
                          padding="10px 0"
                          margin="5px 0"
                          justifyContent="flex-start"
                          fontSize="18px"
                          onClick={() => setShowFilterType(option.name)}
                        >
                          {option.name}
                        </Button>

                        <Box color="#aaa" fontSize="14px">
                          {displaySelectedFilterItemsMobile(option.name, filterQuery)}
                        </Box>
                      </Box>
                    ))}
                  </Flex>
                  <Flex justifyContent="center">
                    <Button
                      borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
                      marginBottom={['120px', '80px', 0]}
                      onClick={() => {
                        setFilterData(filterQuery)
                        onClose()
                      }}
                    >
                      Filter Items
                    </Button>
                  </Flex>
                </DrawerBody>
              </>
            )}
            {showFilterType && <>{displayFilterType(showFilterType)}</>}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default Mobile
