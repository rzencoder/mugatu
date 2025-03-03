import { Flex } from '@chakra-ui/react'
import { Jumbotron, Featured, Carousel, Banner, SmallBanner } from '../../components'
import { Layout, Meta } from '@/components/layouts'
import { graphQLClient } from '@/graphql/client'
import { formatResponseData } from '../../utils'
import { featuredItemsMen } from '@/data/featuredItems'
import { GET_PRODUCTS_BY_GENDER } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { Item } from '@/types/item'

export default function Men({ productData }: { productData: Item[] }): JSX.Element {
  return (
    <>
      <Meta
        title="Men's Fashion | Mugatu"
        description="Latest designer men's shirts, jackets, jumpers, jeans, coats"
      />
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/men/men-jumbotron.jpg"
            buttonText="Shop Now"
            bgColor="#137571"
            buttonHoverColor="#5fabf9"
            gender="men"
            buttonColor="#0790d0"
            text="Latest styles now in"
          />
          <SmallBanner />
          <Featured items={featuredItemsMen} gender="male" />
          <Banner
            colour="#116bc7"
            bgColour="#137571"
            imageSrc="/landing/men/banner-bg-men.jpg"
            title="dress to impress"
            text="20% off all jackets"
            linkHref="/men/catalog/jackets"
          />
          <Carousel products={productData} />
        </Flex>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await graphQLClient.request(GET_PRODUCTS_BY_GENDER, { gender: 'male' })
  const formattedData = formatResponseData(response.productCollection.items)
  const filteredData = formattedData.filter((item: Item) => item.popular)
  return {
    props: {
      productData: filteredData,
    },
  }
}
