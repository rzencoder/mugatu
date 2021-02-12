import { Flex, useColorMode, Menu, MenuList, MenuItem, MenuButton, Box } from '@chakra-ui/react'
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Slider from './slider'
import { displayTickOnSelected } from '@/utils/filter'

// Display filter component on larger screens
const Desktop = ({ options, updateQuery, filterQuery }) => {
  const { colorMode } = useColorMode()
  return (
    <Flex display={['none', null, 'flex']} padding="10px 0">
      {options.map((option) => (
        <Menu key={option.name}>
          <MenuButton
            as="button"
            p={2}
            value={option.name}
            style={{ fontSize: '18px', marginRight: '15px' }}
          >
            {option.name}
            <ChevronDownIcon />
          </MenuButton>
          <MenuList bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
            {option.items.map((item) => {
              // Display a list of possible filter options for each category of filter. Display a range slider for the price option instead
              if (option.name !== 'price') {
                return (
                  <MenuItem
                    display="flex"
                    justifyContent="space-between"
                    key={item}
                    onClick={() => updateQuery(option.name, item, 'desktop')}
                  >
                    <Box>{item}</Box>
                    <Box>
                      {displayTickOnSelected(option.name, item, filterQuery) && <CheckIcon />}
                    </Box>
                  </MenuItem>
                )
              } else {
                const values = filterQuery.find((query) => query.name === option.name)
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

export default Desktop
