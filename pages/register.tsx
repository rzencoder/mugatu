import { Layout, Meta } from '@/components/layouts'
import { useForm } from 'react-hook-form'
import { Toast } from '../components'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import {
  Box,
  Heading,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { firebaseClient } from '@/firebase/firebaseClient'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/dist/client/router'

interface FormData {
  email: string
  name: string
  password: string
  confirmPassword: string
}

const Register = (): JSX.Element => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const { register, handleSubmit, errors, watch } = useForm()
  const { colorMode } = useColorMode()
  const toast = useToast()
  const password = useRef({})
  password.current = watch('password', '')
  const { user } = useAuth()
  const router = useRouter()

  if (user && user.email) {
    router.push('/')
  }

  const onSubmit = async ({ email, name, password, confirmPassword }: FormData) => {
    if (password !== confirmPassword) {
      return toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => (
          <Toast title="Password error" message="passwords entered must match" status="error" />
        ),
      })
    }
    try {
      await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
      const user = firebaseClient.auth().currentUser
      await user.updateProfile({
        displayName: name,
      })
      window.location.href = '/'
    } catch (error) {
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => <Toast title="Register error" message={error.message} status="error" />,
      })
    }
  }

  return (
    <>
      <Meta title="Create new account | Mugatu" />
      <Layout bg={colorMode === 'light' ? '#f7f7f7' : '#000'}>
        <Flex justifyContent="center" alignItems="center" minHeight="600px">
          <Flex
            direction="column"
            bg={colorMode === 'light' ? 'mainWhite' : '#111'}
            maxWidth="500px"
            width="100%"
            minHeight="450px"
            padding="30px"
          >
            <Heading as="h2" fontWeight="600" fontSize="30px" padding="10px 0 30px">
              create an account
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl m="10px 0" isInvalid={errors.name && errors.name.message}>
                <FormLabel margin="3px 0">first name</FormLabel>
                <Input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  aria-label="first name"
                  name="name"
                  ref={register({
                    required: 'please enter your first name',
                  })}
                />
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              <FormControl m="10px 0" isInvalid={errors.email && errors.email.message}>
                <FormLabel margin="3px 0">email address</FormLabel>
                <Input
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  aria-label="Email Address"
                  name="email"
                  ref={register({
                    required: 'please enter your email.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  })}
                  placeholder="name@site.com"
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl m="10px 0" isInvalid={errors.password && errors.password.message}>
                <FormLabel margin="3px 0">password</FormLabel>
                <Box position="relative">
                  <Input
                    aria-label="Password"
                    name="password"
                    type={passwordShown ? 'text' : 'password'}
                    ref={register({
                      required: 'please enter your password.',
                      minLength: {
                        value: 8,
                        message: 'password must have at least 8 characters',
                      },
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
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                m="5px 0"
                isInvalid={errors.confirmPassword && errors.confirmPassword.message}
              >
                <FormLabel margin="10px 0">confirm password</FormLabel>
                <Box position="relative">
                  <Input
                    aria-label="Confirm Password"
                    name="confirmPassword"
                    type={confirmPasswordShown ? 'text' : 'password'}
                    ref={register({
                      validate: (value) =>
                        value === password.current || 'the passwords do not match',
                    })}
                  />
                  <Button
                    variant="icon"
                    position="absolute"
                    aria-label="toggle show confirm password"
                    fontSize="28px"
                    top={['8px', null, '5px']}
                    right={['0', null, '-5px']}
                    zIndex="1000"
                    color={colorMode === 'light' ? '#ccc' : '#555'}
                    onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}
                  >
                    {!confirmPasswordShown ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </Box>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" mt="20px">
                Register
              </Button>
            </form>
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export default Register
