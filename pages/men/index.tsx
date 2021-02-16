import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { Jumbotron, Featured, Carousel, Banner, SmallBanner } from '../../components'
import { Layout } from '../../components/layouts'
import { graphQLClient } from '../../graphql/client'
import { formatResponseData } from '../../utils'
import { featuredItemsMen } from 'data/featuredItems'
import { GET_PRODUCTS_BY_GENDER } from 'graphql/queries'

export default function Men({ productData }) {
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
          <SmallBanner />
          <Featured items={featuredItemsMen} gender="male" />
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

export async function getStaticProps() {
  const response = await graphQLClient.request(GET_PRODUCTS_BY_GENDER, { gender: 'male' })
  const formattedData = formatResponseData(response.productCollection.items)
  const filteredData = formattedData.filter((item) => item.popular)
  return {
    props: {
      productData: filteredData,
    },
  }
}
