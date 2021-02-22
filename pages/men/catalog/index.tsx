import { Layout, Catalog, Meta } from '@/components/layouts'

export default function MenCatalog(): JSX.Element {
  return (
    <>
      <Meta
        title="Men's Fashion | Mugatu"
        description="Latest designer men's shirts, jackets, jumpers, jeans, coats"
      />
      <Layout>
        <Catalog productPage="home" />
      </Layout>
    </>
  )
}
