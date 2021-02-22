import { Layout, ErrorLayout, Meta } from '@/components/layouts'

export default function FourZeroFour(): JSX.Element {
  return (
    <>
      <Meta title="Latest Women's and Men's Fashion | Mugatu" />
      <Layout>
        <ErrorLayout message="sorry, we can't find the page you're looking for" />
      </Layout>
    </>
  )
}
