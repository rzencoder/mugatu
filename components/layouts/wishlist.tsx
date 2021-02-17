import { useBag } from '@/context/bagContext'
import { useWishlist } from '@/context/wishlistContext'
import { Item } from '@/types/item'
import { DeleteIcon } from '@chakra-ui/icons'
import { Flex, Box, Heading, Button, Select, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import { Toast } from '..'

export default function Wishlist(): JSX.Element {
  const { wishlist, removeFromWishlist } = useWishlist()
  const [selectedProducts, setSelectedProducts] = useState([])
  const toast = useToast()
  const { addToBag } = useBag()

  // Storing the user selected product and size in state
  const handleSizeSelection = (item: Item, size: string) => {
    const filteredSelectedProducts = [...selectedProducts].filter(
      (product) => product.id !== item.id
    )
    setSelectedProducts([...filteredSelectedProducts, { ...item, selectedSize: size }])
  }

  // Helper checking if user has selected a size to display correct info
  const checkIfSizeIsChosen = (item: Item) => {
    const foundProducts = selectedProducts.find((product) => product.id === item.id)
    return foundProducts ? true : false
  }

  // Remove item from wishlist
  const removeSelected = (item: Item) => {
    const filteredSelectedProducts = selectedProducts.filter((product) => product.id === item.id)
    setSelectedProducts(filteredSelectedProducts)
  }

  //Move item into shopping bag and remove from wishlist
  const moveToBag = (item: Item) => {
    const chosenItem = selectedProducts.find((product) => product.id === item.id)
    addToBag({ ...chosenItem, quantity: 1 })
    removeSelected(item)
    removeFromWishlist(item)
    toast({
      duration: 3000,
      // eslint-disable-next-line react/display-name
      render: () => <Toast title="Item moved to your shopping cart" status="success" />,
    })
  }

  return (
    <Flex direction="column" align="center" p={['20px 5px', '20px']} minHeight="500px">
      <Heading as="h2" margin="10px 0 20px" fontWeight="600">
        {wishlist && wishlist.length !== 0 && 'wishlist'}
      </Heading>
      <Flex
        height="100%"
        width="100%"
        maxWidth="1300px"
        wrap="wrap"
        justifyContent={['center', null, null, 'flex-start']}
      >
        {wishlist &&
          wishlist.length > 0 &&
          wishlist.map((item: Item) => {
            return (
              <Flex
                key={`wishlist-${item.id}`}
                margin={['15px 5px', '15px']}
                width={['100%', '100%', '45%', '30%']}
                justify="center"
              >
                <Flex maxWidth="250px" minWidth="160px" position="relative">
                  <Image height={450} width={300} src={item.image.url} />
                  <Flex position="absolute" p="0" borderRadius="50%" bottom="1" left="1" bg="#ddd">
                    <Button
                      onClick={() => {
                        removeFromWishlist(item)
                        toast({
                          duration: 3000,
                          // eslint-disable-next-line react/display-name
                          render: () => (
                            <Toast title="Item removed from wishlist" status="success" />
                          ),
                        })
                      }}
                      variant="transparentBg"
                      color="#333"
                      _hover={{
                        color: '#555',
                      }}
                    >
                      <DeleteIcon w={6} h={6} />
                    </Button>
                  </Flex>
                </Flex>
                <Flex
                  maxWidth="180px"
                  width="50%"
                  direction="column"
                  ml="10px"
                  justify="space-between"
                >
                  <Box fontSize="18px" textTransform="lowercase" fontWeight="600">
                    {item.name}
                  </Box>
                  <Flex direction="column">
                    <Box>£{item.price}</Box>
                    <Box textTransform="lowercase">{item.colour}</Box>
                  </Flex>
                  <Flex direction="column">
                    <Flex direction="column" margin="5px 0 10px">
                      <Box>choose size</Box>
                      <Select onChange={(e) => handleSizeSelection(item, e.target.value)}>
                        {item.sizes.map((size) => {
                          return (
                            <option
                              key={`wishlist-size-${size.size}`}
                              disabled={size.stock === 0}
                              value={size.size}
                            >
                              {size.size}
                            </option>
                          )
                        })}
                      </Select>
                    </Flex>
                    {checkIfSizeIsChosen(item) ? (
                      <Button disabled={false} size="sm" onClick={() => moveToBag(item)}>
                        Add to bag
                      </Button>
                    ) : (
                      <Button disabled={true} size="sm">
                        Choose Size
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            )
          })}
        {wishlist && wishlist.length === 0 && (
          <Flex margin="50px auto" direction="column" textAlign="center">
            <Box fontSize="24px" p="15px 0" fontWeight="700">
              your wishlist is empty
            </Box>
            <Box p="5px 20px">
              click the heart icon next to your favourite items to see them here
            </Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
