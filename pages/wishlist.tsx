import Head from 'next/head'
import { Layout, Wishlist } from '@/components/layouts'

export default function WishlistPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Wishlist | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Wishlist />
      </Layout>
    </>
  )
}
