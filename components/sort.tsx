import { Flex, Select } from '@chakra-ui/react'
import { useState } from 'react'

export default function Sort(): JSX.Element {
  return (
    <Flex position="relative">
      <Select
        style={{ direction: 'rtl' }}
        iconSize="0px"
        placeholder="Sort"
        border="none"
        textTransform="uppercase"
        fontSize="20px"
        color="mainBlack"
      >
        <option>Price low to high</option>
        <option>Price high to low</option>
        <option>Newest In</option>
      </Select>
    </Flex>
  )
}
