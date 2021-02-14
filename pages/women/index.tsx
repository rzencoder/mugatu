import { useProducts } from '@/context/productsContext'
import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { Jumbotron, Featured, Carousel, Banner, SmallBanner } from '../../components'
import { Layout } from '../../components/layouts'
import { graphQLClient } from '../../graphql/client'
import { GET_PRODUCTS_BY_GENDER } from '../../graphql/queries'
import { formatResponseData } from '../../utils'
import { featuredItemsWomen } from 'data/featuredItems'

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
          <SmallBanner />
          <Featured items={featuredItemsWomen} gender="female" />
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

export async function getStaticProps() {
  const response = await graphQLClient.request(GET_PRODUCTS_BY_GENDER, { gender: 'female' })
  const formattedData = formatResponseData(response.productCollection.items)
  const filteredData = formattedData.filter((item) => item.popular)
  return {
    props: {
      productData: filteredData,
    },
  }
}
