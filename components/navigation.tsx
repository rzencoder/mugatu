import { Box, Flex, Image, useColorMode, Button, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useBag } from '../context/bagContext'

export default function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { bag } = useBag()
  return (
    <nav>
      <Flex
        bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
        justifyContent="space-around"
        alignItems="center"
        p={3}
      >
        <NextLink href="/women" passHref>
          <Link fontSize={['18px', null, '22px']}>WOMEN</Link>
        </NextLink>
        <Box boxSize={['70px', null, '90px']} margin="10px" marginLeft={['-10px', '-20px']}>
          <NextLink href="/" passHref>
            <Link>
              <Image
                filter={colorMode === 'dark' ? 'invert()' : 'none'}
                src="/logo.png/"
                alt="logo"
              />
            </Link>
          </NextLink>
        </Box>
        <NextLink href="/men" passHref>
          <Link fontSize={['18px', null, '22px']}>MEN</Link>
        </NextLink>
      </Flex>
      <Flex bg="#333" padding={['8px', null, '10px']}>
        <Flex margin="0 auto" width="90%" alignItems="center" justifyContent="space-between">
          <Button variant="icon" backgroundImage="url(/icons/search.png)" />
          <Flex>
            <NextLink href={'/'} passHref>
              <Link>
                <Button variant="icon" backgroundImage="url(/icons/account.png)" />
              </Link>
            </NextLink>
            <Button variant="icon" backgroundImage="url(/icons/heart.png)" />
            <Button variant="icon" backgroundImage="url(/icons/bag.png)" position="relative">
              <Box
                position="absolute"
                color="mainWhite"
                top={['9px', '12px']}
                fontSize="12px"
                left={['8px', '10px']}
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
