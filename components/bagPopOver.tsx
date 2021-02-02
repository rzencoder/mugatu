import { useBag } from '@/context/bagContext'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  Button,
  useColorMode,
  Link,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

const BagPopOver = () => {
  const { colorMode } = useColorMode()
  const { bag, removeFromBag } = useBag()

  const calculateSubTotal = () => {
    const total = bag.reduce((acc, cur) => {
      return cur.price * cur.quantity + acc
    }, 0)
    return total.toFixed(2)
  }

  const calculateNumOfItems = () => {
    return bag.reduce((acc, cur) => {
      return acc + parseInt(cur.quantity)
    }, 0)
  }

  if (!bag || bag.length === 0) {
    return null
  }
  return (
    <PopoverContent
      display={['none', null, null, 'block']}
      bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
    >
      <PopoverCloseButton top="12px" />
      <PopoverHeader fontSize="20px" fontWeight="700" textAlign="center">
        my bag
      </PopoverHeader>
      <PopoverBody>
        <Flex direction="column">
          <Box fontWeight="700">{`${calculateNumOfItems()} item${
            calculateNumOfItems() > 1 ? 's' : ''
          }`}</Box>
          <Flex direction="column" height="180px" overflowY="scroll">
            {bag.map((item) => {
              return (
                <Flex key={`popover-bag-item-${item.name}`} p="10px 0">
                  <Flex minWidth="100px">
                    <Image src={item.image.url} width="100" height="150" />
                  </Flex>
                  <Flex
                    direction="column"
                    p="0 10px"
                    fontSize="14px"
                    justifyContent="space-between"
                    textTransform="lowercase"
                  >
                    <Box fontSize="15px">{item.name}</Box>
                    <Flex direction="column" width="80%" fontSize="13px">
                      <Box>{item.colour}</Box>
                      <Box>size: {item.selectedSize}</Box>
                      <Box>qty: {item.quantity}</Box>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Box fontWeight="700" fontSize="16px">
                        £{item.price}
                      </Box>
                      <Button
                        variant="transparentBg"
                        onClick={() => {
                          removeFromBag(item)
                        }}
                      >
                        <DeleteIcon _hover={{ color: colorMode === 'light' ? '#555' : '#ccc' }} />
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" p="12px 0" fontSize="18px">
            <Box>subtotal</Box>
            <Box fontWeight="700">£{calculateSubTotal()}</Box>
          </Flex>
          <NextLink href="/bag" passHref>
            <Link>
              <Button
                width="100%"
                _hover={{ bg: colorMode === 'light' ? 'mainBlackHover' : 'mainWhiteHover' }}
              >
                View Bag
              </Button>
            </Link>
          </NextLink>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  )
}

export default BagPopOver
