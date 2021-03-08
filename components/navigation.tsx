import { useWishlist } from '@/context/wishlistContext'
import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  useColorMode,
  Button,
  Link,
  useDisclosure,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import { MobileNavMenu } from '.'
import BagPopOver from './bag/bagPopOver'
import { useBag } from '@/context/bagContext'
import Search from './search'
import Image from 'next/image'
import { useFocus } from 'hooks/useFocus'
import { useAuth } from '@/context/authContext'

export default function Navigation(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()
  const { bag } = useBag()
  const { wishlist } = useWishlist()
  // Handle Menu on mobile
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showSearch, setShowSearch] = useState(false)
  const [gender, setGender] = useState('women')
  const [inputRef, setInputFocus] = useFocus()
  const { user } = useAuth()

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
            <Link
              width="90px"
              height="100px"
              aria-label="home page link"
              filter={colorMode === 'dark' ? 'invert()' : 'none'}
            >
              <Image width="90px" height="100px" src="/logo.png" alt="logo" />
            </Link>
          </NextLink>
        </Box>
        <NextLink href="/men" passHref>
          <Link fontSize={['18px', null, '22px']}>MEN</Link>
        </NextLink>
      </Flex>
      <Flex bg="#333" padding={['10px']}>
        <Flex
          justifyContent={['space-between', null, 'flex-end']}
          alignItems="center"
          margin="0 auto"
          width={['100%', '90%']}
        >
          <Button
            variant="icon"
            aria-label="menu toggle"
            display={['inline-flex', null, 'none']}
            onClick={onOpen}
          >
            <HamburgerIcon w={8} h={8} />
          </Button>
          <MobileNavMenu isOpen={isOpen} onClose={onClose} gender={gender} setGender={setGender} />
          <Flex
            alignItems="center"
            justifyContent={['flex-end', null, 'space-between']}
            width="100%"
          >
            <Flex alignItems="center" margin="0 2px">
              <Button
                variant="icon"
                aria-label="open search bar"
                onClick={() => {
                  setInputFocus()
                  setShowSearch(!showSearch)
                }}
                position="relative"
                zIndex="100"
              >
                <SearchIcon w={[6, null, 7]} h={[6, null, 7]} />
              </Button>
              <Search showSearch={showSearch} setShowSearch={setShowSearch} inputRef={inputRef} />
            </Flex>
            <Flex alignItems="center">
              <NextLink href={'/account'} passHref>
                <Link m="0 15px">
                  <Box
                    backgroundImage={`url(/icons/account${
                      user && user.displayName ? '-solid' : ''
                    }.png)`}
                    backgroundSize="cover"
                    width="30px"
                    height="30px"
                    p="5px"
                  />
                </Link>
              </NextLink>
              <NextLink href="/wishlist" passHref>
                <Link aria-label="wishlist" margin="0 15px">
                  <Box
                    width="30px"
                    height="30px"
                    p="5px"
                    backgroundImage={`url(/icons/heart${
                      wishlist && wishlist.length ? '-solid' : ''
                    }.png)`}
                    backgroundSize="cover"
                  />
                </Link>
              </NextLink>

              <Popover trigger="hover">
                <PopoverTrigger>
                  <Button
                    variant="icon"
                    backgroundImage="url(/icons/bag.png)"
                    position="relative"
                    width="30px"
                    height="30px"
                  >
                    <NextLink href="/bag" passHref>
                      <Link>
                        <Box>
                          <Box
                            position="absolute"
                            color="mainWhite"
                            top="12px"
                            fontSize="12px"
                            left="10px"
                            width={bag.length < 10 ? '10px' : '15px'}
                            textAlign="center"
                          >
                            {bag.length}
                          </Box>
                        </Box>
                      </Link>
                    </NextLink>
                  </Button>
                </PopoverTrigger>
                <BagPopOver />
              </Popover>

              <Button
                display={['none', null, 'block']}
                variant="icon"
                aria-label="toggle dark mode"
                color="#f1f1f1"
                fontSize="30px"
                width="40px"
                height="40px"
                padding="0"
                onClick={toggleColorMode}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </nav>
  )
}
