import { Layout, Wishlist, Meta } from '@/components/layouts'

export default function WishlistPage(): JSX.Element {
  return (
    <>
      <Meta title="Wishlist | Mugatu" />
      <Layout>
        <Wishlist />
      </Layout>
    </>
  )
}
