import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { Toast } from '..'
import { useForm } from 'react-hook-form'
import { firebaseClient } from '@/firebase/firebaseClient'
import { useAuth } from '@/context/authContext'

interface Props {
  isOpen: boolean
  onClose: () => void
  userName: string
  userEmail: string
}

interface FormData {
  name: string
  email: string
}

const Details = ({ isOpen, onClose }: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const toast = useToast()
  const { user } = useAuth()
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: user.displayName,
      email: user.email,
    },
  })

  const handleChangeDetails = async ({ name, email }: FormData) => {
    try {
      // Do nothing if user makes no changes
      if (user.displayName === name && user.email === email) return

      const userRef = firebaseClient.auth().currentUser
      if (user.displayName !== name) {
        await userRef.updateProfile({
          displayName: name,
        })
      }
      if (user.email !== email) {
        await userRef.updateEmail(email)
      }
      reset({ name, email })
      onClose()
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => (
          <Toast
            title="Success!"
            message="You have successfully updated your details"
            status="success"
          />
        ),
      })
    } catch (error) {
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => <Toast title="Error!" message={error.message} status="error" />,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
        <ModalHeader fontSize="24px" p="25px 20px 0">
          my details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="20px">
          <Flex>
            <form onSubmit={handleSubmit(handleChangeDetails)}>
              <FormControl m="10px 0" isInvalid={errors.name && errors.name.message ? true : false}>
                <FormLabel margin="3px 0">name</FormLabel>
                <Box position="relative">
                  <Input
                    aria-label="Name"
                    name="name"
                    type="text"
                    ref={register({
                      required: 'please enter your name',
                    })}
                  />
                </Box>
                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                m="10px 0"
                isInvalid={errors.email && errors.email.message ? true : false}
              >
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
                  placeholder="name@site.com"
                />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <Button type="submit" mt="20px">
                Save Changes
              </Button>
            </form>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Details
