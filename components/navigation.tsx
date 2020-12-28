import { Box, Flex, Image, useColorMode, Button, Link as LinkStyle } from '@chakra-ui/react'
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
            boxSize="70px"
            marginLeft="-20px"
          />
        </Link>
        <Link href="/men">
          <LinkStyle>MEN</LinkStyle>
        </Link>
      </Flex>
      <Flex bg="#222" height="40px" padding="5px">
        <Flex margin="0 auto" width="90%" alignItems="center" justifyContent="space-between">
          <Button variant="icon" backgroundImage="url(/icons/search.png)" />
          <Flex>
            <Link href={'/'}>
              <Button variant="icon" backgroundImage="url(/icons/account.png)" />
            </Link>
            <Button variant="icon" backgroundImage="url(/icons/heart.png)" />
            <Button variant="icon" backgroundImage="url(/icons/bag.png)" position="relative">
              <Box
                position="absolute"
                color="#fff"
                top="7px"
                fontSize="12px"
                left="7.5px"
                width={bag.length < 10 ? '10px' : '15px'}
                textAlign="center"
              >
                {bag.length}
              </Box>
            </Button>
            <Button
              variant="icon"
              backgroundImage={`url(/icons/${colorMode === 'dark' ? 'sun' : 'moon'}.png)`}
              onClick={toggleColorMode}
            />
          </Flex>
        </Flex>
      </Flex>
    </nav>
  )
}
