import { Box, Flex, Link, Heading, Button } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Jumbotron({
  bgColor,
  imageUrl,
  buttonText,
  buttonColor,
  gender,
  buttonHoverColor,
  children,
}): JSX.Element {
  return (
    <NextLink href={`/${gender}/catalog`} passHref>
      <Link height="600px" width="100%" position="relative">
        <Image
          src={imageUrl}
          layout="fill"
          className="jumbotron-gender-landing"
          role="presentation"
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
              variant="jumbo"
              bg={buttonColor}
              fontSize={['26px', '32px', '38px']}
              margin="50px auto 0"
              _hover={{ bg: buttonHoverColor }}
            >
              {buttonText}
            </Button>
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  )
}
