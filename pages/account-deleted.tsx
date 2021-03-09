import { Layout, Meta } from '@/components/layouts'
import { TempMessage } from '../components'

export default function BagPage(): JSX.Element {
  return (
    <>
      <Meta />
      <Layout>
        <TempMessage message="account successfully deleted" />
      </Layout>
    </>
  )
}
