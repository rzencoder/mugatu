import { Layout, Meta } from '@/components/layouts'
import { TempMessage } from '../components'

export default function BagPage(): JSX.Element {
  return (
    <>
      <Meta title="Checkout | Mugatu" />
      <Layout>
        <TempMessage />
      </Layout>
    </>
  )
}
