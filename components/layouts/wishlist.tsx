import { useWishlist } from '@/context/wishlistContext'
import { DeleteIcon } from '@chakra-ui/icons'
import { Flex, Box, Heading, Button, Select, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'

export default function Wishlist() {
  const { wishlist } = useWishlist()
  const { colorMode } = useColorMode()
  const [selectedProducts, setSelectedProducts] = useState([])

  return (
    <Flex direction="column" align="center" p={['20px 5px', '20px']} minHeight="500px">
      <Heading as="h2" margin="10px 0 20px">
        Wishlist
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
          wishlist.map((item) => {
            return (
              <Flex
                key={`wishlist-${item.id}`}
                margin={['15px 5px', '15px']}
                width={['100%', '100%', '45%', '30%']}
                justify="center"
              >
                <Flex minWidth="150px" maxWidth="250px" position="relative">
                  <Image height={450} width={300} src={item.image.url} />
                  <Flex position="absolute" p="4px" borderRadius="50%" top="1" right="1">
                    <Button variant="transparentBg" color={colorMode === 'light' ? '#bbb' : '#222'}>
                      <DeleteIcon w={7} h={7} />
                    </Button>
                  </Flex>
                </Flex>
                <Flex direction="column" ml="10px" maxWidth="180px" justify="space-between">
                  <Box fontSize="18px" textTransform="lowercase">
                    {item.name}
                  </Box>
                  <Flex direction="column">
                    <Box>£{item.price}</Box>
                    <Box textTransform="lowercase">{item.colour}</Box>
                  </Flex>
                  <Flex direction="column">
                    <Flex direction="column" margin="5px 0 10px">
                      <Box>choose size</Box>
                      <Select>
                        {item.sizes.map((size) => {
                          return (
                            <option key={`wishlist-size-${size.size}`} disabled={size.stock === 0}>
                              {size.size}
                            </option>
                          )
                        })}
                      </Select>
                    </Flex>
                    <Button size="sm">Choose Size</Button>
                  </Flex>
                </Flex>
              </Flex>
            )
          })}
        {wishlist && wishlist.length === 0 && <Flex margin="auto">Your wishlist is empty</Flex>}
      </Flex>
    </Flex>
  )
}
