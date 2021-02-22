import { Flex } from '@chakra-ui/react'
import { Jumbotron, Featured, Carousel, Banner, SmallBanner } from '../../components'
import { Layout, Meta } from '@/components/layouts'
import { graphQLClient } from '@/graphql/client'
import { GET_PRODUCTS_BY_GENDER } from '@/graphql/queries'
import { formatResponseData } from '../../utils'
import { featuredItemsWomen } from '@/data/featuredItems'
import { Item } from '@/types/item'
import { GetStaticProps } from 'next'

export default function Women({ productData }: { productData: Item[] }): JSX.Element {
  return (
    <>
      <Meta
        title="Women's Fashion | Mugatu"
        description="Latest designer women's dresses, tops, skirts, jeans, coats"
      />
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/women/women-jumbotron.jpg"
            buttonText="Shop Now"
            buttonHoverColor="#cd41d6"
            bgColor="#b0f"
            gender="women"
            buttonColor="#d219de"
            text="Party season is here"
          />
          <SmallBanner />
          <Featured items={featuredItemsWomen} gender="female" />
          <Banner
            colour="#fb0862"
            bgColour="#c50f53"
            imageSrc="/landing/women/banner-bg-women.jpg"
            title="dress to impress"
            text="20% off all dresses"
            linkHref="/women/catalog/dresses"
          />
          <Carousel products={productData} />
        </Flex>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await graphQLClient.request(GET_PRODUCTS_BY_GENDER, { gender: 'female' })
  const formattedData = formatResponseData(response.productCollection.items)
  const filteredData = formattedData.filter((item: Item) => item.popular)
  return {
    props: {
      productData: filteredData,
    },
  }
}
