import { Box, Flex, Link, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

const EmptyBag = () => {
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

export default EmptyBag
