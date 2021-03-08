import { ChevronDownIcon, MoonIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Link,
} from '@chakra-ui/react'
import { FooterMobile } from '.'
import { genderData, menuOptions } from '@/data/mobileNavMenuData'
import NextLink from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/authContext'

interface MobileNavMenuProps {
  isOpen: boolean
  onClose: () => void
  gender: string
  setGender: (gender: string) => void
}

const MobileNavMenu = ({ isOpen, onClose, gender, setGender }: MobileNavMenuProps): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user } = useAuth()

  const getGenderDataIndex = () => {
    return genderData.map((el) => el.gender).indexOf(gender)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-autofocus
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} autoFocus={false}>
      <DrawerOverlay>
        <DrawerContent
          bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
          textTransform="lowercase"
        >
          <DrawerHeader p="10px 30px">
            <Menu>
              <MenuButton
                fontSize="20px"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="transparentBg"
                textTransform="lowercase"
                _hover={{ color: colorMode === 'light' ? '#444' : '#ddd' }}
              >
                {gender}
              </MenuButton>
              <MenuList bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'} fontSize="18px">
                <MenuItem onClick={() => setGender('women')}>women</MenuItem>
                <MenuItem onClick={() => setGender('men')}>men</MenuItem>
              </MenuList>
            </Menu>
            <DrawerCloseButton
              bg="transparent"
              top="13px"
              right="40px"
              _hover={{ bg: 'transparent', color: colorMode === 'light' ? '#666' : '#ccc' }}
            />
            <Divider />
          </DrawerHeader>

          <DrawerBody p="10px 30px">
            {user && user.displayName && (
              <Flex fontSize="22px" p="0 0 10px" fontWeight="600">
                <Box>hey {user.displayName}</Box>
              </Flex>
            )}
            {menuOptions.map((option) => {
              return (
                <NextLink key={`mob-menu-${option.name}`} href={option.href} passHref>
                  <Link>
                    <Flex alignItems="center" fontSize="18px" p="8px 0">
                      <Box
                        backgroundImage={`url(/icons/${option.imageSrc}.png)`}
                        backgroundSize="cover"
                        width="23px"
                        height="23px"
                        mr="10px"
                        filter={colorMode === 'light' ? 'invert()' : 'none'}
                      />
                      <Box>{option.name}</Box>
                    </Flex>
                  </Link>
                </NextLink>
              )
            })}

            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="5px 0 10px"
            >
              <Flex alignItems="center" fontSize="18px">
                <MoonIcon
                  mr="10px"
                  color={colorMode === 'light' ? '#333' : 'mainWhite'}
                  fontSize="24px"
                />
                <FormLabel htmlFor="dark-mode" fontSize="18px" margin="0" fontWeight="400">
                  Dark Mode
                </FormLabel>
              </Flex>
              <Switch
                display="flex"
                id="dark-mode"
                onChange={toggleColorMode}
                isChecked={colorMode === 'dark'}
                colorScheme={gender === 'men' ? 'teal' : 'pink'}
              />
            </FormControl>

            <Flex direction="column">
              <NextLink href={`/${gender}/catalog`} passHref>
                <Link>
                  <Box position="relative" margin="10px 0">
                    <Box display="flex">
                      <Image
                        src={`/menu/menu-feature-${gender}.jpg`}
                        width={300}
                        height={243}
                        role="none"
                      />
                    </Box>
                    <Box
                      position="absolute"
                      top="0"
                      background={gender === 'women' ? '#ff0052' : '#009da5'}
                      opacity="0.4"
                      width="100%"
                      height="100%"
                    />
                    <Flex
                      position="absolute"
                      top="0"
                      width="100%"
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        padding="20px 10px"
                        mt="20px"
                        color="mainWhite"
                      >
                        <Box fontFamily="Montserrat" textTransform="uppercase" fontSize="26px">
                          Latest Styles
                        </Box>
                        <Button
                          borderColor="mainWhite"
                          color="mainWhite"
                          padding="10px 15px"
                          fontSize="18px"
                          mt="20px"
                          _hover={{ bg: 'transparent' }}
                        >
                          Shop Now
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Link>
              </NextLink>
              <Flex direction="column">
                {genderData[getGenderDataIndex()].products.map((product) => {
                  return (
                    <NextLink key={`mob-menu-cat-${product.name}`} href={product.href} passHref>
                      <Link>
                        <Box textTransform="lowercase" padding="10px 0" fontSize="22px">
                          {product.name}
                        </Box>
                      </Link>
                    </NextLink>
                  )
                })}
              </Flex>
            </Flex>
            <Divider />
            <FooterMobile />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default MobileNavMenu
