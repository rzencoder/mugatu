import { useWishlist } from '../context/wishlistContext'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
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
import { useBag } from '../context/bagContext'
import Search from './search'
import Image from 'next/image'
import { useFocus } from 'hooks/useFocus'

export default function Navigation(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()
  const { bag } = useBag()
  const { wishlist } = useWishlist()
  // Handle Menu on mobile
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showSearch, setShowSearch] = useState(false)
  const [gender, setGender] = useState('women')
  const [inputRef, setInputFocus] = useFocus()

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
            <Link filter={colorMode === 'dark' ? 'invert()' : 'none'}>
              <Image width="90px" height="100px" src="/logo.png" alt="logo" />
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
          <MobileNavMenu isOpen={isOpen} onClose={onClose} gender={gender} setGender={setGender} />
          <Flex
            alignItems="center"
            justifyContent={['flex-end', null, 'space-between']}
            width="100%"
          >
            <Flex alignItems="center">
              <Button
                variant="icon"
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
            <Flex>
              {/* <NextLink href={'/'} passHref>
                <Link>
                  <Button variant="icon" backgroundImage="url(/icons/account.png)" />
                </Link>
              </NextLink> */}
              <NextLink href="/wishlist" passHref>
                <Link>
                  <Box position="relative">
                    <Button variant="icon" backgroundImage="url(/icons/heart.png)" />
                    {wishlist && wishlist.length >= 1 && (
                      <Box
                        position="absolute"
                        top={['-1px', null, '-2px']}
                        right={['7px', null, '12px']}
                        width="10px"
                        height="10px"
                        borderRadius="50%"
                        bg="mainRed"
                      />
                    )}
                  </Box>
                </Link>
              </NextLink>

              <Popover trigger="hover">
                <PopoverTrigger>
                  <Button variant="icon" backgroundImage="url(/icons/bag.png)" position="relative">
                    <NextLink href="/bag" passHref>
                      <Link>
                        <Box>
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
