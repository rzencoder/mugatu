import nookies from 'nookies'
import { firebaseAdmin } from '@/firebase/firebaseAdmin'
import { GetServerSideProps } from 'next'
import Account from '@/components/auth/account'
import { Layout, Meta } from '@/components/layouts'

const AccountPage = (): JSX.Element => {
  return (
    <>
      <Meta title="My Account | Mugatu" />
      <Layout>
        <Account />
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    await firebaseAdmin.auth().verifyIdToken(cookies.token)
    return {
      props: {},
    }
  } catch (err) {
    // redirect if no cookie or cookie verification fails
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
}

export default AccountPage
