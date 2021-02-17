import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'

const SmallBanner = (): JSX.Element => {
  return (
    <Flex
      color="#222"
      bg="mainWhite"
      p={3}
      textTransform="lowercase"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      fontSize={['20px', '24px', '26px']}
      fontWeight="500"
    >
      <Box minWidth="60px">
        <Image src="/icons/delivery.png" width="60px" height="60px" role="presentation" />
      </Box>
      <Box ml="20px">free delivery when you spend over £40</Box>
    </Flex>
  )
}

export default SmallBanner
