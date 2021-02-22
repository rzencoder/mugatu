import { Layout, Catalog, Meta } from '@/components/layouts'

export default function WomenCatalog(): JSX.Element {
  return (
    <>
      <Meta
        title="Women's Fashion | Mugatu"
        description="Latest designer women's dresses, tops, skirts, jeans, coats"
      />
      <Layout>
        <Catalog productPage="home" />
      </Layout>
    </>
  )
}
