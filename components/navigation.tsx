import { Box, Flex, Image, useColorMode, Link as LinkStyle } from '@chakra-ui/react'
import Link from 'next/link'
import { useBag } from '../context/bagContext'

export default function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { bag } = useBag()
  return (
    <nav>
      <Flex
        bg={colorMode === 'light' ? '#fff' : '#000'}
        justifyContent="space-around"
        alignItems="center"
        p={3}
      >
        <Link href="/women">
          <LinkStyle>WOMEN</LinkStyle>
        </Link>
        <Link href="/">
          <Image
            filter={colorMode === 'dark' ? 'invert()' : 'none'}
            src="/logo.png/"
            alt="logo"
            boxSize="100px"
            marginLeft="-20px"
          />
        </Link>
        <Link href="/men">
          <LinkStyle>MEN</LinkStyle>
        </Link>
      </Flex>
      <Flex bg="#444" height="40px" padding="5px">
        <Flex margin="0 auto" width="90%" alignItems="center" justifyContent="space-between">
          <Box
            backgroundImage="url(/icons/search.png)"
            backgroundSize="contain"
            width="25px"
            height="25px"
            padding="5px"
            margin="0 10px"
          />
          <Flex>
            <Link href={'/'}>
              <Box
                backgroundImage="url(/icons/account.png)"
                backgroundSize="contain"
                width="25px"
                height="25px"
                padding="5px"
                margin="0 10px"
              />
            </Link>
            <Box
              backgroundImage="url(/icons/heart.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
            />
            <Box
              backgroundImage="url(/icons/bag.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
              color="#f00"
            >
              {bag.length}
            </Box>
            <Box
              backgroundImage="url(/icons/moon.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
              onClick={toggleColorMode}
            />
          </Flex>
        </Flex>
      </Flex>
    </nav>
  )
}
