import { Box, Button, Flex, Heading, useColorMode } from '@chakra-ui/react'
import { useBag } from '../context/bagContext'
import { ProductData } from '../types/productData'
import Image from 'next/image'

const FullProduct = ({ productData }: { productData: any }): JSX.Element => {
  const { name, image, price, rrp, colour, sizes } = productData
  const { addToBag } = useBag()
  const { colorMode } = useColorMode()

  return (
    <Flex flexDirection="column">
      <Box width={['100%', '400px']} position="relative">
        <Image width={600} height={900} src={image.url} />
        <Box
          bg={colorMode === 'dark' ? 'mainWhite' : 'mainBlack'}
          color={colorMode === 'dark' ? 'mainBlack' : 'mainWhite'}
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
        <Box>Sizes: {sizes.map((el: number) => el)}</Box>
        <Flex>
          <Button bg="#156f15" onClick={addToBag}>
            Add to Bag
          </Button>
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
