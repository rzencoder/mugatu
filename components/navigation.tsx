import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, Image, useColorMode, Button, Link, useDisclosure } from '@chakra-ui/react'
import NextLink from 'next/link'
import { MobileNavMenu } from '.'
import { useBag } from '../context/bagContext'

export default function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { bag } = useBag()
  // Handle Menu on mobile
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        <Flex justifyContent={['space-between', null, 'flex-end']} margin="0 auto" width="90%">
          <Button variant="icon" display={['inline-flex', null, 'none']} onClick={onOpen}>
            <HamburgerIcon w={8} h={8} />
          </Button>
          <MobileNavMenu isOpen={isOpen} onClose={onClose} />
          <Flex
            alignItems="center"
            justifyContent={['flex-end', null, 'space-between']}
            width="100%"
          >
            <Button variant="icon">
              <SearchIcon w={[6, null, 7]} h={[6, null, 7]} />
            </Button>
            <Flex>
              <NextLink href={'/'} passHref>
                <Link>
                  <Button variant="icon" backgroundImage="url(/icons/account.png)" />
                </Link>
              </NextLink>
              <NextLink href="/wishlist" passHref>
                <Link>
                  <Button variant="icon" backgroundImage="url(/icons/heart.png)" />
                </Link>
              </NextLink>
              <Button variant="icon" backgroundImage="url(/icons/bag.png)" position="relative">
                <Box
                  position="absolute"
                  color="mainWhite"
                  top={['9px', null, '12px']}
                  fontSize="12px"
                  left={['7.5px', null, '10px']}
                  width={bag.length < 10 ? '10px' : '15px'}
                  textAlign="center"
                >
                  {bag.length}
                </Box>
              </Button>
              <Button
                display={['none', null, 'block']}
                variant="icon"
                backgroundImage={`url(/icons/${colorMode === 'dark' ? 'sun' : 'moon'}.png)`}
                onClick={toggleColorMode}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </nav>
  )
}
