import { useAuth } from '@/context/authContext'
import { firebaseClient } from '@/firebase/firebaseClient'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Flex,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Toast } from '..'

interface Props {
  isOpen: boolean
  onClose: () => void
}

interface SubmitProps {
  password: string
}

const DeleteAccountAlert = ({ isOpen, onClose }: Props): JSX.Element => {
  const [passwordShown, setPasswordShown] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const { colorMode } = useColorMode()
  const cancelRef = useRef()
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const onSubmit = async ({ password }: SubmitProps) => {
    try {
      await firebaseClient.auth().signInWithEmailAndPassword(user.email, password)
      await fetch('/api/users/delete/', { method: 'DELETE' })
      const userRef = firebaseClient.auth().currentUser
      await userRef.delete()
      router.push('/account-deleted')
    } catch (error) {
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => <Toast title="Error!" message={error.message} status="error" />,
      })
    }
  }

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="26px" fontWeight="600">
            delete account
          </AlertDialogHeader>

          <AlertDialogBody>
            <Box>Are you sure? This cannot be undone.</Box>
            <Box>Enter your password and confirm to delete your account</Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl m="5px 0" isInvalid={errors.password && errors.password.message}>
                <Box position="relative" margin="10px 0">
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
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <Flex margin="20px 0">
                <Button ref={cancelRef} onClick={onClose} mr="20px">
                  Cancel
                </Button>
                <Button type="submit" bg="#de2020" borderColor="#de2020" color="white">
                  Delete
                </Button>
              </Flex>
            </form>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteAccountAlert
