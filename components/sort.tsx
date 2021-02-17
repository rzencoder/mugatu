import { CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  Button,
  MenuList,
  useColorMode,
  Box,
} from '@chakra-ui/react'
import sortTypes from 'data/sortValues'

interface SortProps {
  sortValue: string
  setSortValue: (sortValue: string) => void
}

export default function Sort({ sortValue, setSortValue }: SortProps): JSX.Element {
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
              <MenuItem
                key={`sort-${item.value}`}
                onClick={() => setSortValue(item.value)}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>{item.name}</Box>
                {item.value === sortValue ? <CheckIcon /> : ''}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
    </Flex>
  )
}
