import { Layout, Meta } from '@/components/layouts'
import { firebaseClient } from '@/firebase/firebaseClient'
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  useColorMode,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

interface FormProps {
  email: string
}

const PasswordReset = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm()
  const { colorMode } = useColorMode()

  const onSubmit = async ({ email }: FormProps) => {
    console.log(email)
    const result = await firebaseClient.auth().sendPasswordResetEmail(email)
    console.log(result)
  }

  return (
    <>
      <Meta title="Forgotten Password | Mugatu" />
      <Layout>
        <Flex justifyContent="center" width="100%" bg={colorMode === 'light' ? '#f7f7f7' : '#000'}>
          <Flex
            direction="column"
            p={['20px', null, '20px 40px']}
            width={['90%', null, '60%']}
            margin={['40px 0', null, '80px 0']}
            bg={colorMode === 'light' ? '#fff' : '#111'}
          >
            <Heading as="h2" fontWeight="600" p="20px 0px">
              reset your password
            </Heading>
            <Box p="10px 0 30px">
              enter your email address and we&apos;ll send you an email with instructions on how to
              create a new password
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl m="5px 0" isInvalid={errors.email && errors.email.message}>
                <FormLabel margin="3px 0">email address</FormLabel>
                <Input
                  aria-label="Email Address"
                  name="email"
                  ref={register({
                    required: 'please enter your email.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <Button type="submit" mt="20px">
                Reset password
              </Button>
            </form>
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export default PasswordReset
