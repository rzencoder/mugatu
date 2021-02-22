import { Heading } from '@chakra-ui/react'
import { Layout, Catalog, Meta } from './'

interface CategoryPageProps {
  title: string
  productPage: string
}

export default function CategoryPage({ title, productPage }: CategoryPageProps): JSX.Element {
  return (
    <>
      <Meta title={`${title} | Mugatu`} description={title} />
      <Layout>
        <Heading
          as="h2"
          p={['25px 10px 10px', '15px 10px 10px']}
          textTransform="lowercase"
          textAlign="center"
          fontWeight="500"
        >
          {title}
        </Heading>
        <Catalog productPage={productPage} />
      </Layout>
    </>
  )
}
