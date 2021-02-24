import React from 'react'
import nookies from 'nookies'
import { firebaseAdmin } from '@/firebase/firebaseAdmin'
import { firebaseClient } from '@/firebase/firebaseClient'
import { GetServerSideProps } from 'next'
import { Box, Button, Flex } from '@chakra-ui/react'

interface AccountProps {
  message: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context)
    console.log(JSON.stringify(cookies, null, 2))
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
    const { uid, email } = token

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    }
  } catch (err) {
    // redirect if no cookie or cookie verification fails
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
      props: {},
    }
  }
}

const Account = ({ message }: AccountProps): JSX.Element => (
  <Flex>
    <Box>{message}!</Box>
    <Button
      onClick={async () => {
        await firebaseClient.auth().signOut()
        window.location.href = '/'
      }}
    >
      Sign out
    </Button>
  </Flex>
)

export default Account