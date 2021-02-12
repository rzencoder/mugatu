import { useBag } from '@/context/bagContext'
import { useWishlist } from '@/context/wishlistContext'
import { DeleteIcon, ChevronDownIcon, InfoIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  Link,
  Button,
  useColorMode,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState, useEffect } from 'react'

const deliveryOptions = [
  {
    name: 'standard delivery',
    price: 4.95,
  },
  {
    name: 'next day delivery',
    price: 6.95,
  },
  {
    name: 'click and collect standard',
    price: 4.95,
  },
  {
    name: 'click and collect next day',
    price: 6.95,
  },
]

const Bag = () => {
  const { bag, updateBag, removeFromBag } = useBag()
  const { addToWishlist } = useWishlist()
  const { colorMode } = useColorMode()
  const [delivery, setDelivery] = useState(deliveryOptions[0])

  const getQuantityOptions = (item) => {
    const options = []
    const size = item.sizes.find((el) => el.size === item.selectedSize)
    for (let i = 1; i <= size.stock; i++) {
      if (i > 10) break
      options.push(i)
    }
    return options
  }

  const calculateSubTotal = () => {
    const total = bag.reduce((acc, cur) => {
      return cur.price * cur.quantity + acc
    }, 0)
    return total.toFixed(2)
  }

  const subtotal = calculateSubTotal()

  const displayDeliveryPrice = (price) => {
    if (price === 0) {
      return 'free'
    } else {
      return `£${price}`
    }
  }

  useEffect(() => {
    if (parseFloat(subtotal) > 50) {
      if (delivery.name === 'standard delivery' || delivery.name === 'click and collect standard') {
        if (delivery.price !== 0) {
          setDelivery({ ...delivery, price: 0 })
        }
      }
    } else {
      if (delivery.price === 0) {
        const originalPrice = deliveryOptions.find((option) => option.name === delivery.name)
        setDelivery({ ...delivery, price: originalPrice.price })
      }
    }
  }, [bag, delivery])

  if (!bag || bag.length === 0) {
    return (
      <Flex direction="column" justify="center" alignItems="center" minHeight="450px">
        <Box
          textTransform="lowercase"
          fontSize="28px"
          fontWeight="600"
          width="80%"
          textAlign="center"
          padding="0 0 30px"
        >
          Your Shopping Bag Is Empty
        </Box>
        <NextLink href="/" passHref>
          <Link>
            <Button>Continue Shopping</Button>
          </Link>
        </NextLink>
      </Flex>
    )
  }

  return (
    <Box bg={colorMode === 'light' ? '#eee' : 'mainBlack'}>
      <Flex
        direction={['column', null, 'row']}
        maxWidth="1000px"
        minHeight="500px"
        margin="0 auto"
        padding={['15px 5px', '20px']}
        justifyContent="space-between"
        position="relative"
      >
        <Flex width={['100%', null, '60%']} direction="column" mr={['5px', '20px']}>
          <Flex
            direction="column"
            p={['15px 10px', '20px']}
            mb="20px"
            bg={colorMode === 'light' ? 'mainWhite' : '#111'}
          >
            <Box p="0 0 15px" fontWeight="600" fontSize="28px">
              my bag
            </Box>
            {bag.map((item) => {
              return (
                <Flex key={`bag-item-${item.id}`} p="10px 0">
                  <Flex
                    minWidth={['120px', '140px']}
                    maxWidth={['120px', '140px']}
                    maxHeight={['180px', 'none']}
                  >
                    <Image src={item.image.url} width={150} height={225}></Image>
                  </Flex>
                  <Flex
                    direction="column"
                    p={['0 0 0 10px', '0 10px 0 15px']}
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Flex justifyContent="space-between">
                      <NextLink
                        href={`/${item.gender === 'female' ? 'women' : 'men'}/catalog/${item.slug}`}
                        passHref
                      >
                        <Link>
                          <Box fontSize={['16px', '18px']} fontWeight="600">
                            {item.name}
                          </Box>
                        </Link>
                      </NextLink>
                      <Button
                        variant="icon"
                        fontSize="22px"
                        padding="5px"
                        margin={['0 3px', '0 10px']}
                        onClick={() => removeFromBag(item)}
                        color={colorMode === 'light' ? '#999' : '#aaa'}
                      >
                        <DeleteIcon
                          _hover={{
                            color: colorMode === 'light' ? '#777' : '#ccc',
                          }}
                        />
                      </Button>
                    </Flex>
                    <Flex p="5px 0" fontSize={['14px', '15px']} direction="column">
                      <Box p="0">{item.colour}</Box>
                      <Box p="0">size: {item.selectedSize}</Box>
                      <Flex alignItems="center">
                        <Box>qty:</Box>
                        <Menu>
                          <MenuButton
                            fontSize="15px"
                            height="20px"
                            as={Button}
                            rightIcon={<ChevronDownIcon m="0" />}
                            variant="transparentBg"
                            textTransform="lowercase"
                          >
                            {item.quantity}
                          </MenuButton>
                          <MenuList
                            bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
                            fontSize="16px"
                            minWidth="0"
                          >
                            {getQuantityOptions(item).map((el) => {
                              return (
                                <MenuItem
                                  key={`product-quantity-${el}`}
                                  onClick={() => updateBag({ ...item, quantity: el })}
                                >
                                  {el}
                                </MenuItem>
                              )
                            })}
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Flex>
                    <Flex p="5px 0">
                      <Box fontSize={['19px', '22px']} color="mainRed">
                        £{item.price}
                      </Box>
                      <Box
                        fontSize={['14px', '15px']}
                        textDecoration="line-through"
                        margin="3px 0 0 8px"
                        color={colorMode === 'light' ? '#333' : '#ddd'}
                      >
                        £{item.rrp}
                      </Box>
                    </Flex>
                    <Button
                      fontSize={['14px', '15px']}
                      borderWidth="1px"
                      width={['150px', '170px']}
                      height={['35px', '45px']}
                      p={['1px', '3px 5px']}
                      _hover={{ bg: colorMode === 'light' ? 'mainBlackHover' : 'mainWhiteHover' }}
                      onClick={() => {
                        addToWishlist(item)
                        removeFromBag(item)
                      }}
                    >
                      <Box
                        backgroundImage="url(/icons/heart.png)"
                        width={['15px', '20px']}
                        height={['15px', '20px']}
                        backgroundSize="cover"
                        filter={colorMode === 'light' ? 'invert()' : 'none'}
                      />
                      <Box p="0 0 2px 5px" textTransform="lowercase">
                        Move to Wishlist
                      </Box>
                    </Button>
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
          <Flex
            display={['none', null, 'flex']}
            justifyContent="space-between"
            bg={colorMode === 'light' ? 'mainWhite' : '#111'}
            p="20px"
            fontSize="22px"
            fontWeight="600"
          >
            <Box>sub-total</Box>
            <Box>£{subtotal}</Box>
          </Flex>
        </Flex>
        <Flex
          width={['100%', null, '40%']}
          direction="column"
          height={['350px']}
          bg={colorMode === 'light' ? 'mainWhite' : '#111'}
          p="20px"
          justifyContent="space-between"
        >
          <Box p="0 0 15px" fontWeight="600" fontSize="28px">
            summary
          </Box>
          <Flex direction="column" fontSize="16px">
            <Flex justifyContent="space-between" fontWeight="600">
              <Box>sub-total</Box>
              <Box>£{subtotal}</Box>
            </Flex>
            {subtotal < 50 && (
              <Flex
                bg={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
                color={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
                p="8px 12px"
                alignItems="center"
                margin="10px 0"
                fontWeight="600"
              >
                <InfoIcon fontSize="22px" mr="15px" />
                <Box>{`spend £${(50 - parseFloat(subtotal)).toFixed(
                  2
                )} more to qualify for free delivery`}</Box>
              </Flex>
            )}
            <Flex direction="column">
              <Flex justifyContent="space-between" fontWeight="600">
                <Box>delivery</Box>
                <Box>{displayDeliveryPrice(delivery.price)}</Box>
              </Flex>
              <Menu>
                <MenuButton
                  textAlign="left"
                  as={Button}
                  border="none"
                  textTransform="lowercase"
                  p="0"
                  fontWeight="400"
                  fontSize="16px"
                >
                  <Box as="span">{`${delivery.name} (${displayDeliveryPrice(
                    delivery.price
                  )})`}</Box>
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  {deliveryOptions.map((option, index) => {
                    const price = option.name === delivery.name ? delivery.price : option.price
                    return (
                      <MenuItem
                        key={`delivery-option-${option.name}`}
                        onClick={() => setDelivery(deliveryOptions[index])}
                      >
                        {`${option.name} (${displayDeliveryPrice(price)})`}
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </Menu>
            </Flex>
            <Flex justifyContent="space-between" fontSize="22px" fontWeight="600" p="5px 0">
              <Box>total</Box>
              <Box>£{(parseFloat(subtotal) + delivery.price).toFixed(2)}</Box>
            </Flex>
          </Flex>
          <NextLink href="/checkout" passHref>
            <Link>
              <Button
                bg="#0d6d33"
                border="none"
                color="mainWhite"
                width="100%"
                _hover={{
                  bg: '#15ab51',
                }}
              >
                Checkout
              </Button>
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Bag
