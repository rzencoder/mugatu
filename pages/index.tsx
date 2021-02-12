import Head from 'next/head'
import { Layout } from '../components/layouts'
import { Box, Flex, Heading, Button, Link } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Latest Women&apos;s and Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box>
          <Box height={['650px']} position="relative">
            <Box width="100%" height="inherit" objectFit="cover">
              <Image
                role="presentation"
                src="/landing/jumbotron-home-page.jpg"
                layout="fill"
                className="jumbotron"
              />
            </Box>
            <Box
              height="inherit"
              width="100%"
              position="absolute"
              top="0"
              bg="#ff006a"
              opacity="0.2"
            />
            <Flex
              position="absolute"
              top="0"
              alignItems="center"
              justifyContent="center"
              color="mainWhite"
              height="inherit"
              width="100%"
            >
              <Box textAlign="center" marginTop="-20px">
                <Heading
                  textTransform="uppercase"
                  as="h2"
                  fontSize={['48px', '66px', '80px', '100px']}
                  width={['fit-content', null, null, '800px']}
                  p={['10px', '10px 20px']}
                  fontFamily="Montserrat"
                  textAlign="center"
                >
                  So Hot Right Now
                </Heading>
                <NextLink href="/women/catalog" passHref>
                  <Link>
                    <Button
                      borderRadius="0"
                      border="none"
                      fontFamily="Montserrat"
                      marginTop="50px"
                      fontSize={['28px', '34px']}
                      p={['15px 40px']}
                      bg="#ff006a"
                      transform="skewX(-3deg)"
                      height="fit-content"
                      width="fit-content"
                      _hover={{ bg: '#f91b8b' }}
                    >
                      Shop Sale
                    </Button>
                  </Link>
                </NextLink>
              </Box>
            </Flex>
          </Box>
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
          <Flex direction={['column', null, 'row']} color="mainWhite">
            <Box
              position="relative"
              width={['100%', null, '50%']}
              height={['450px', '500px', '550px', '600px']}
            >
              <Image
                src="/landing/women/shop-women.jpg"
                layout="fill"
                className="home-page-cat-img"
                role="presentation"
              />
              <Flex
                position="relative"
                direction="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Box fontSize="50px" fontWeight="500">
                  latest women&apos;s
                </Box>
                <NextLink href="/women/catalog" passHref>
                  <Link>
                    <Button mt="20px" borderColor="mainWhite">
                      Shop Now
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
            </Box>
            <Box
              position="relative"
              width={['100%', null, '50%']}
              height={['450px', '500px', '550px', '600px']}
            >
              <Image
                src="/landing/men/shop-men.jpg"
                layout="fill"
                className="home-page-cat-img"
                role="presentation"
              />
              <Box position="absolute" top="0" bg="#000" width="100%" height="100%" opacity="0.2" />
              <Flex
                position="relative"
                top="0"
                direction="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Box fontSize="50px" fontWeight="500">
                  latest men&apos;s
                </Box>
                <NextLink href="/men/catalog" passHref>
                  <Link>
                    <Button mt="20px" borderColor="mainWhite">
                      Shop Now
                    </Button>
                  </Link>
                </NextLink>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  )
}
