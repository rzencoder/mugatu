import { useProducts } from '@/context/productsContext'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { Jumbotron, Featured } from '../../components'
import { Layout } from '../../components/layouts'

const items = [
  {
    name: 'dresses',
    link: '/women/catalog?category=dress',
    imageUrl: '/landing/women/dress.jpg',
    rotate: 4,
  },
  {
    name: 'skirts',
    link: '/women/catalog?category=skirt',
    imageUrl: '/landing/women/skirt.jpg',
    rotate: -3,
  },
  {
    name: 'tops',
    link: '/women/catalog?category=top',
    imageUrl: '/landing/women/top.jpg',
    rotate: 2.5,
  },
  {
    name: 'coats & jackets',
    link: '/women/catalog?category=coat',
    imageUrl: '/landing/women/coat.jpg',
    rotate: -3.5,
  },
]

export default function Women() {
  const { updateGender } = useProducts()

  useEffect(() => {
    updateGender('female')
  }, [])

  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/women/women-header.jpg"
            buttonText="Shop Now"
            bgColor="#b0f"
            gender="women"
          >
            Party season is here
          </Jumbotron>
          <Box color="mainBlack" bg="mainWhite" p={3} textTransform="uppercase" textAlign="center">
            get 15% off all new orders{' '}
          </Box>
          <Featured items={items} gender="female" />
        </Flex>
      </Layout>
    </>
  )
}
