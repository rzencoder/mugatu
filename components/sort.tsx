import { useProducts } from '@/context/productsContext'
import { Flex, Menu, MenuButton, MenuItem, Button, MenuList, useColorMode } from '@chakra-ui/react'
import sortTypes from 'data/sortTypes'

export default function Sort(): JSX.Element {
  const { colorMode } = useColorMode()
  const { sort } = useProducts()

  return (
    <Flex position="relative">
      <Menu>
        <MenuButton
          as={Button}
          fontSize={['18px', null, '28px']}
          fontWeight="400"
          borderWidth="2px"
          padding={['10px 15px', null, 6]}
          borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
          _hover={{
            bg: colorMode === 'light' ? 'mainBlackHover' : 'mainWhiteHover',
          }}
        >
          Sort
        </MenuButton>
        <MenuList
          bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
          textAlign="right"
          borderRadius="none"
        >
          {sortTypes.map((item) => {
            return (
              <MenuItem key={`sort-${item.value}`} onClick={() => sort(item.value)}>
                {item.value}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
    </Flex>
  )
}
