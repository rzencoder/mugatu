import { Layout } from '@/components/layouts'
import NextLink from 'next/link'
import Head from 'next/head'
import { Link, Flex, Heading, Box } from '@chakra-ui/react'

export default function FourZeroFour() {
  return (
    <>
      <Head>
        <title>Latest Women&apos;s and Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          direction="column"
          textAlign="center"
          width={['90%', '70%']}
          minHeight="300px"
          margin="100px auto"
        >
          <Heading as="h2">sorry, we can&apos;t find the page you&apos;re looking for</Heading>
          <Flex direction="column" mt="20px">
            <Box m="30px">you can go back or try these links</Box>
            <Flex
              textTransform="uppercase"
              fontWeight="700"
              fontSize="22px"
              justifyContent="space-between"
              width={['270px', null, '500px']}
              margin="0 auto"
            >
              <NextLink href="/women" passHref>
                <Link>women</Link>
              </NextLink>
              <NextLink href="/" passHref>
                <Link>home</Link>
              </NextLink>
              <NextLink href="/men" passHref>
                <Link>men</Link>
              </NextLink>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}
