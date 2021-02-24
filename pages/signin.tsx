import React, { useState } from 'react'
import NextLink from 'next/link'
import { firebaseClient } from '@/firebase/firebaseClient'
import { Box, Button, Input, Link } from '@chakra-ui/react'

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box>
      <NextLink href="/">
        <Link>Go back to home page</Link>
      </NextLink>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
      <Input
        type={'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={'Password'}
      />
      <Button
        onClick={async () => {
          await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
          window.location.href = '/'
        }}
      >
        Create account
      </Button>
      <Button
        onClick={async () => {
          await firebaseClient.auth().signInWithEmailAndPassword(email, password)
          window.location.href = '/'
        }}
      >
        Log in
      </Button>
    </Box>
  )
}

export default SignIn
