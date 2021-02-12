import { useProducts } from '@/context/productsContext'
import { Flex, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { Jumbotron, Featured, Carousel, Banner } from '../../components'
import { Layout } from '../../components/layouts'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { graphQLClient } from '../../graphql/client'
import { GET_PRODUCT_BY_SLUG } from '../../graphql/queries'
import { formatResponseData } from '../../utils'
import { gql } from 'graphql-request'

const items = [
  {
    name: 'shirts',
    link: '/men/catalog/shirts',
    imageUrl: '/landing/men/shirt.jpg',
    rotate: 4,
  },
  {
    name: 'jeans',
    link: '/men/catalog/jeans',
    imageUrl: '/landing/men/jeans.jpg',
    rotate: -3,
  },
  {
    name: 'knitwear',
    link: '/men/catalog/knitwear',
    imageUrl: '/landing/men/jumper.jpg',
    rotate: 2.5,
  },
  {
    name: 'coats',
    link: '/men/catalog/coats',
    imageUrl: '/landing/men/jacket.jpg',
    rotate: -3.5,
  },
]

export default function Men({ productData }) {
  const { updateGender } = useProducts()

  useEffect(() => {
    updateGender('male')
  }, [])

  return (
    <>
      <Head>
        <title>Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/men/men-jumbotron.jpg"
            buttonText="Shop Now"
            bgColor="#137571"
            buttonHoverColor="#5fabf9"
            gender="men"
            buttonColor="#089fe6"
          >
            Latest styles now in
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
            fontWeight="500"
          >
            <Box minWidth="60px">
              <Image src="/icons/delivery.png" width="60px" height="60px" role="presentation" />
            </Box>
            <Box ml="20px">free delivery when you spend over £40</Box>
          </Flex>
          <Featured items={items} gender="male" />
          <Banner
            colour="#116bc7"
            bgColour="#137571"
            imageSrc="/landing/men/banner-bg-men.jpg"
            text="dress to impress"
            linkHref="/men/catalog/jackets"
          >
            20% off all jackets
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
    { gender: 'male' }
  )
  const formattedData = formatResponseData(response.productCollection.items)
  const filteredData = formattedData.filter((item) => item.popular)
  return {
    props: {
      productData: filteredData,
    },
  }
}
