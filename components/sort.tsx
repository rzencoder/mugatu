import { Flex, Menu, MenuButton, MenuItem, Button, MenuList, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'

export default function Sort(): JSX.Element {
  const { colorMode } = useColorMode()
  return (
    <Flex position="relative">
      <Menu>
        <MenuButton
          as={Button}
          fontSize="20px"
          fontWeight="400"
          borderWidth="1px"
          borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
        >
          Sort
        </MenuButton>
        <MenuList
          bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
          textAlign="right"
          borderRadius="none"
        >
          <MenuItem>Price (Low to High)</MenuItem>
          <MenuItem>Price (High to Low)</MenuItem>
          <MenuItem>Alphabetical</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
