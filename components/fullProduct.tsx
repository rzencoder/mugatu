import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useToast,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from '@chakra-ui/react'
import { useBag } from '@/context/bagContext'
import Image from 'next/image'
import { useState } from 'react'
import { ImageInfo, Toast } from '.'
import { useWishlist } from '@/context/wishlistContext'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Item } from '@/types/item'

interface FullProductProps {
  item: Item
}

const FullProduct = ({ item }: FullProductProps): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { name, image, price, rrp, colour, sizes, popular } = item
  const { addToBag } = useBag()
  const { addToWishlist } = useWishlist()
  const { colorMode } = useColorMode()
  const toast = useToast()

  const handleAddToBag = () => {
    const product = { ...item, selectedSize, quantity }
    const result = addToBag(product)
    toast({
      duration: 3000,
      // eslint-disable-next-line react/display-name
      render: () => <Toast title={result.title} message={result.message} status={result.status} />,
    })
  }

  const displayStockMessage = () => {
    if (!selectedSize) return null
    const { stock } = sizes.filter((el) => el.size === selectedSize)[0]
    let stockMessage = ''
    let color = ''
    if (stock < 1) {
      stockMessage = 'OUT OF STOCK'
      color = 'mainRed'
    } else if (stock < 6) {
      stockMessage = 'LOW STOCK'
      color = 'mainRed'
    } else {
      stockMessage = 'IN STOCK'
      color = 'inherit'
    }
    return (
      <Box as="span" color={color}>
        {stockMessage}
      </Box>
    )
  }

  const getQuantityOptions = () => {
    if (!selectedSize) return [1]
    const item = sizes.find((el) => el.size === selectedSize)
    if (item.stock === 0) return [0]
    const options = []
    for (let i = 1; i <= item.stock; i++) {
      if (i > 10) break
      options.push(i)
    }
    return options
  }

  return (
    <Flex
      flexDirection={['column', null, 'row']}
      alignItems={['center']}
      margin={['0px', '20px', '40px']}
      justifyContent={[null, null, 'center']}
    >
      <Box width={['100%', '400px']} position="relative" mr={[null, null, '20px', '80px']}>
        <Image width={600} height={900} src={image.url} />
        {popular && <ImageInfo />}
      </Box>

      <Flex
        flexDirection="column"
        p={[3, 4]}
        width={['100%', '85%']}
        maxWidth={[null, null, '450px']}
      >
        <Heading
          as="h2"
          textTransform="lowercase"
          fontWeight="400"
          minHeight={[null, null, '85px']}
        >
          {name}
        </Heading>
        <Flex alignItems="center" margin="10px 0 0">
          <Box color="mainRed" fontSize={['26px', '28px']} mr="5px">
            £{price}
          </Box>
          <Box textDecoration="line-through" color="#aaa" fontSize="14px" mt="-10px">
            rrp £{rrp}
          </Box>
        </Flex>
        <Box margin="5px 0 0">
          <Box as="span" fontWeight="600">
            colour:
          </Box>{' '}
          {colour}
        </Box>
        <Flex direction="column">
          <Box margin="10px 0 5px">
            <Box as="span" fontWeight="600">
              size:
            </Box>{' '}
            <Box as="span" textTransform="uppercase">
              {selectedSize}
            </Box>
          </Box>
          <Flex wrap="wrap">
            {sizes.map((el) => (
              <Button
                disabled={el.stock === 0}
                onClick={() => setSelectedSize(el.size.toString())}
                key={`size-${el.size}`}
                bg={colorMode === 'light' ? '#ddd' : '#333'}
                borderColor={
                  el.size.toString() === selectedSize
                    ? colorMode === 'light'
                      ? 'mainBlack'
                      : 'mainWhite'
                    : 'transparent'
                }
                padding={0}
                fontSize={['16px']}
                margin={1}
                _hover={{
                  bg: colorMode === 'light' ? '#ccc' : '#444',
                }}
              >
                {el.size}
              </Button>
            ))}
          </Flex>
        </Flex>
        <Box minHeight="40px" padding="10px 0 0" fontWeight="500" fontSize="20px">
          {displayStockMessage()}
        </Box>
        <Flex alignItems="flex-end" margin="10px 0">
          <Flex direction="column" textAlign="center" mr="10px">
            <Box>quantity</Box>
            <Menu>
              <MenuButton
                fontSize="18px"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="transparentBg"
                textTransform="lowercase"
              >
                {quantity}
              </MenuButton>
              <MenuList
                bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
                fontSize="16px"
                minWidth="0"
              >
                {getQuantityOptions().map((el) => {
                  return (
                    <MenuItem key={`product-quantity-${el}`} onClick={() => setQuantity(el)}>
                      {el}
                    </MenuItem>
                  )
                })}
              </MenuList>
            </Menu>
          </Flex>
          <Button
            onClick={handleAddToBag}
            disabled={selectedSize === ''}
            height="50px"
            minWidth="calc(100% - 120px)"
            bg="transparent"
            borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
            fontSize={['20px', '24px']}
            _hover={{
              bg: colorMode === 'light' ? '#eee' : '#111',
              borderColor: colorMode === 'light' ? '#222' : '#ddd',
            }}
          >
            {selectedSize ? 'Add to Bag' : 'Select UK Size'}
          </Button>
          <Flex height="50px" width="50px" padding="9px" margin="0 5px" alignItems="center">
            <Button
              variant="transparentBg"
              onClick={() => {
                const result = addToWishlist(item)
                toast({
                  duration: 3000,
                  // eslint-disable-next-line react/display-name
                  render: () => (
                    <Toast title={result.title} message={result.message} status={result.status} />
                  ),
                })
              }}
            >
              <Box
                backgroundImage="url(/icons/heart.png)"
                filter={colorMode === 'light' ? 'invert()' : 'none'}
                backgroundSize="contain"
                width="100%"
                height="100%"
              />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FullProduct
