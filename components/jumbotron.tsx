import { Box, Flex, Link, Heading, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Jumbotron({
  bgColor,
  imageUrl,
  buttonText,
  gender,
  children,
}): JSX.Element {
  return (
    <NextLink href={`/${gender}/catalog`} passHref>
      <Link height="600px" width="100%" position="relative">
        <Box
          bgImage={`url('${imageUrl}')`}
          bgPosition="top"
          bgRepeat="no-repeat"
          bgSize="cover"
          height="inherit"
        />
        <Box
          position="absolute"
          top="0"
          height="inherit"
          width="inherit"
          backgroundColor={bgColor}
          opacity="0.25"
        ></Box>
        <Flex
          position="absolute"
          top="0"
          height="inherit"
          width="inherit"
          justifyContent="center"
          alignItems="center"
        >
          <Flex direction="column" margin="0 auto" width={['92%', '80%', '70%']}>
            <Heading
              as="h2"
              color="mainWhite"
              fontFamily="Montserrat"
              fontWeight="900"
              fontStyle="italic"
              textTransform="uppercase"
              textAlign="center"
              fontSize={['42px', '55px', '65px', '80px']}
            >
              {children}
            </Heading>
            <Button
              color="mainWhite"
              fontSize={['md', 'lg', 'xl']}
              width={['50%', '45%', '40%', '30%']}
              margin="50px auto 0"
            >
              {buttonText}
            </Button>
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  )
}
