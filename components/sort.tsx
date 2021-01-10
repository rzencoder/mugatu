import { Flex, Menu, MenuButton, MenuItem, Button, MenuList, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'

export default function Sort(): JSX.Element {
  const { colorMode } = useColorMode()
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
        >
          Sort
        </MenuButton>
        <MenuList
          bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
          textAlign="right"
          borderRadius="none"
        >
          <MenuItem>price (low to high)</MenuItem>
          <MenuItem>price (high to low)</MenuItem>
          <MenuItem>alphabetical</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
