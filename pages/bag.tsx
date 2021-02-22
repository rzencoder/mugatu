import { Layout, Meta } from '@/components/layouts'
import Bag from '@/components/bag'

export default function BagPage(): JSX.Element {
  return (
    <>
      <Meta title="Shopping Bag | Mugatu" />
      <Layout>
        <Bag />
      </Layout>
    </>
  )
}
