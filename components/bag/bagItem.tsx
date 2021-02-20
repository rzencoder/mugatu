import { getQuantityOptions } from '@/utils/bag'
import { useWishlist } from '@/context/wishlistContext'
import { DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons'
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
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useBag } from '@/context/bagContext'
import { BagItem } from '@/types/bagItem'
import { Toast } from '..'

interface Props {
  item: BagItem
}

const BagItemComponent = ({ item }: Props): JSX.Element => {
  const { addToWishlist } = useWishlist()
  const { updateBag, removeFromBag } = useBag()
  const { colorMode } = useColorMode()
  const toast = useToast()

  const handleMoveToWishlist = (item: BagItem) => {
    removeFromBag(item)
    const { title, status } = addToWishlist(item)
    const message =
      status === 'success'
        ? 'Item moved to your wishlist'
        : 'A problem occurred moving your item to your wishlist'
    toast({
      duration: 3000,
      // eslint-disable-next-line react/display-name
      render: () => <Toast title={title} message={message} status={status} />,
    })
  }

  return (
    <Flex p="10px 0">
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
            onClick={() => {
              const result = removeFromBag(item)
              toast({
                duration: 3000,
                // eslint-disable-next-line react/display-name
                render: () => (
                  <Toast title={result.title} message={result.message} status={result.status} />
                ),
              })
            }}
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
          onClick={() => handleMoveToWishlist(item)}
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
}

export default BagItemComponent
