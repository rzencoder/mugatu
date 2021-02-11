import { useProducts } from '@/context/productsContext'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Jumbotron, Featured, Carousel, Banner } from '../../components'
import { Layout } from '../../components/layouts'
import { GetStaticProps } from 'next'
import { graphQLClient } from '../../graphql/client'
import { GET_PRODUCT_BY_SLUG } from '../../graphql/queries'
import { formatResponseData } from '../../utils'
import { gql } from 'graphql-request'

const items = [
  {
    name: 'dresses',
    link: '/women/catalog/dresses',
    imageUrl: '/landing/women/dress.jpg',
    rotate: 4,
  },
  {
    name: 'skirts',
    link: '/women/catalog/skirts',
    imageUrl: '/landing/women/skirt.jpg',
    rotate: -3,
  },
  {
    name: 'tops',
    link: '/women/catalog/tops',
    imageUrl: '/landing/women/top.jpg',
    rotate: 2.5,
  },
  {
    name: 'coats',
    link: '/women/catalog/coats',
    imageUrl: '/landing/women/coat.jpg',
    rotate: -3.5,
  },
]

export default function Women({ productData }) {
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
            imageUrl="/landing/women/women-jumbotron.jpg"
            buttonText="Shop Now"
            buttonHoverColor="#cd41d6"
            bgColor="#b0f"
            gender="women"
            buttonColor="#d219de"
          >
            Party season is here
          </Jumbotron>
          <Flex
            color="#222"
            bg="mainWhite"
            p={3}
            textTransform="lowercase"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            fontSize={['20px', '24px', '26px']}
            fontWeight="700"
          >
            <Box minWidth="60px">
              <Image src="/icons/delivery.png" width="60px" height="60px" role="presentation" />
            </Box>
            <Box ml="20px">free delivery when you spend over £40</Box>
          </Flex>
          <Featured items={items} gender="female" />
          <Banner
            colour="#fb0862"
            bgColour="#c50f53"
            imageSrc="/landing/women/banner-bg-women.jpg"
            text="dress to impress"
            linkHref="/women/catalog/dresses"
          >
            20% off all dresses
          </Banner>
          <Carousel products={productData} />
        </Flex>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const response = await graphQLClient.request(
    gql`
      query GetByGender($gender: String!) {
        productCollection(where: { gender: $gender }) {
          items {
            name
            rrp
            price
            colour
            sizes
            slug
            popular
            gender
            image {
              url(transform: { width: 400 })
            }
            sys {
              id
            }
          }
        }
      }
    `,
    { gender: 'female' }
  )
  const formattedData = formatResponseData(response.productCollection.items)
  const filteredData = formattedData.filter((item) => item.popular)
  return {
    props: {
      productData: filteredData,
    },
  }
}
