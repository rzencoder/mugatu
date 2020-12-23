import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react'
import { ProductData } from '../types'

const FullProduct = ({ productData }: ProductData): JSX.Element => {
  const { name, image, price, rrp, colour, sizes } = productData
  console.log(productData)
  return (
    <Flex flexDirection="column">
      <Box width={['100%', '400px']} position="relative">
        <Image src={image.url} />
        <Box
          bg="#fff"
          color="#000"
          pos="absolute"
          bottom="20px"
          right="0"
          fontWeight="700"
          p={2}
          borderRadius="10px 0 0 10px"
        >
          <span role="img" aria-label="">
            🔥
          </span>{' '}
          Hot Right Now
        </Box>
      </Box>

      <Flex flexDirection="column" p={[2, 4]}>
        <Heading as="h2">{name}</Heading>
        <Flex alignItems="center">
          <Box textDecoration="line-through">RRP £{rrp}</Box>
          <Box color="#f00" fontSize={['20px', '26px']}>
            £{price}
          </Box>
        </Flex>
        <Box>Colour: {colour}</Box>
        <Box>Sizes: {sizes.map((el) => el)}</Box>
        <Flex>
          <Button bg="#156f15">Add to Bag</Button>
          <Box
            backgroundImage="url(/icons/heart.png)"
            backgroundSize="contain"
            width="25px"
            height="25px"
            padding="5px"
            margin="0 10px"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FullProduct
