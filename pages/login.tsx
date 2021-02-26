import NextLink from 'next/link'
import { firebaseClient } from '@/firebase/firebaseClient'
import {
  Box,
  Button,
  Input,
  Link,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { Layout, Meta } from '@/components/layouts'
import { useForm } from 'react-hook-form'
import { Toast } from '../components'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useAuth } from '@/context/authContext'

interface FormData {
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const [passwordShown, setPasswordShown] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const { colorMode } = useColorMode()
  const toast = useToast()
  const { user } = useAuth()

  if (user && user.email) {
    window.location.href = '/'
  }

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await firebaseClient.auth().signInWithEmailAndPassword(email, password)
      window.location.href = '/'
    } catch (error) {
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => <Toast title="Login failed" message={error.message} status="error" />,
      })
    }
  }

  return (
    <>
      <Meta title="Login | Mugatu" />
      <Layout bg={colorMode === 'light' ? '#f6f6f6' : '#000'}>
        <Flex width="100%" minHeight="500px" justifyContent="center" alignItems="center">
          <Flex
            bg={colorMode === 'light' ? '#fff' : '#111'}
            maxWidth="900px"
            width="100%"
            minHeight="380px"
            margin={['20px 5px', null, 'auto 20px']}
            alignItems="center"
            justifyContent="center"
          >
            <Flex width="100%" height="80%">
              <Flex width="100%" height="100%" direction={['column', null, 'row']}>
                <Box
                  width={['100%', null, '50%']}
                  height="100%"
                  padding={['20px 5px 5px 25px', null, '20px 30px 5px']}
                >
                  <Heading as="h2" fontWeight="600" mb="20px" fontSize={['30px', null, '34px']}>
                    welcome back
                  </Heading>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl m="5px 0" isInvalid={errors.email && errors.email.message}>
                      <FormLabel margin="3px 0">email address</FormLabel>
                      <Input
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        aria-label="Email Address"
                        name="email"
                        ref={register({
                          required: 'please enter your email.',
                        })}
                        placeholder="name@site.com"
                      />
                      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl m="5px 0" isInvalid={errors.password && errors.password.message}>
                      <FormLabel margin="3px 0">password</FormLabel>
                      <Box position="relative">
                        <Input
                          aria-label="Password"
                          name="password"
                          type={passwordShown ? 'text' : 'password'}
                          ref={register({
                            required: 'please enter your password.',
                          })}
                        />
                        <Button
                          variant="icon"
                          position="absolute"
                          aria-label="toggle show password"
                          fontSize="28px"
                          top={['8px', null, '5px']}
                          right={['0', null, '-5px']}
                          zIndex="1000"
                          color={colorMode === 'light' ? '#ccc' : '#555'}
                          onClick={() => setPasswordShown(!passwordShown)}
                        >
                          {!passwordShown ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </Box>
                      <FormErrorMessage>
                        {errors.password && errors.password.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Box margin="5px 0">
                      <NextLink href="/" passHref>
                        <Link fontSize="14px">forgot your password?</Link>
                      </NextLink>
                    </Box>
                    <Button type="submit" mt="20px">
                      Login
                    </Button>
                  </form>
                </Box>
                <Box
                  width={['100%', null, '50%']}
                  height="100%"
                  padding={['30px 5px 30px 25px', null, '20px 30px 5px']}
                  mt={['30px', null, '0']}
                >
                  <Heading as="h2" fontWeight="600" fontSize={['24px', null, '34px']}>
                    don&apos;t have an account?
                  </Heading>
                  <Box mt={['20px', null, '50px']}>
                    <NextLink href="/register" passHref>
                      <Link
                        bg={colorMode === 'light' ? '#222' : '#eee'}
                        color={colorMode === 'light' ? 'mainWhite' : '#222'}
                        textTransform="uppercase"
                        fontWeight="600"
                        p="10px 20px"
                        fontSize={['18px', null, '22px']}
                      >
                        Register now
                      </Link>
                    </NextLink>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export default Login

// onClick = { async() => {
//   await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
//   window.location.href = '/'
// }}
