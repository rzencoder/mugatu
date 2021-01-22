import { useBag } from '@/context/bagContext'
import { Flex, Box, Link, Button, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

const Bag = () => {
  const { bag } = useBag()
  const { colorMode } = useColorMode()

  if (!bag || bag.length === 0) {
    return (
      <Flex direction="column" justify="center" alignItems="center" minHeight="450px">
        <Box
          textTransform="lowercase"
          fontSize="28px"
          fontWeight="700"
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
        padding="20px"
        justifyContent="space-between"
        position="relative"
      >
        <Flex
          margin="0 20px 0 0"
          width="60%"
          direction="column"
          p="20px"
          bg={colorMode === 'light' ? 'mainWhite' : '#111'}
        >
          <Box p="0 0 15px" fontWeight="700" fontSize="28px">
            my bag
          </Box>
          {bag.map((item) => {
            return (
              <Flex key={`bag-item-${item.id}`}>
                <Flex>
                  <Image src={item.image.url} width={150} height={225}></Image>
                </Flex>
                <Flex p="0 10px">
                  <Box>{item.name}</Box>
                </Flex>
              </Flex>
            )
          })}
        </Flex>
        <Flex width="40%" bg={colorMode === 'light' ? 'mainWhite' : '#111'} p="20px">
          <Box p="0 0 15px" fontWeight="700" fontSize="28px">
            checkout
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Bag
