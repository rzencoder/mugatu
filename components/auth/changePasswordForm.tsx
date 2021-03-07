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
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Toast } from '..'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { firebaseClient } from '@/firebase/firebaseClient'
import { useAuth } from '@/context/authContext'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ChangePasswordForm = ({ isOpen, onClose }: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const toast = useToast()
  const { register, handleSubmit, errors } = useForm()
  const [passwordShown, setPasswordShown] = useState(false)
  const [newPasswordShown, setNewPasswordShown] = useState(false)
  const { user } = useAuth()

  interface FormData {
    password: string
    newPassword: string
  }

  const handleChangePassword = async ({ password, newPassword }: FormData) => {
    try {
      //   await userRef.reauthenticateWithCredential(password)
      await firebaseClient.auth().signInWithEmailAndPassword(user.email, password)
      const userRef = firebaseClient.auth().currentUser
      await userRef.updatePassword(newPassword)
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => (
          <Toast
            title="Success!"
            message="You have successfully changed your password"
            status="success"
          />
        ),
      })
    } catch (error) {
      console.log(error)
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
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <form onSubmit={handleSubmit(handleChangePassword)}>
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
              <FormControl m="10px 0" isInvalid={errors.newPassword && errors.newPassword.message}>
                <FormLabel margin="3px 0">new password</FormLabel>
                <Box position="relative">
                  <Input
                    aria-label="New Password"
                    name="newPassword"
                    type={newPasswordShown ? 'text' : 'password'}
                    ref={register({
                      required: 'please enter a new password.',
                      minLength: {
                        value: 8,
                        message: 'password must have at least 8 characters',
                      },
                    })}
                  />
                  <Button
                    variant="icon"
                    position="absolute"
                    aria-label="toggle show new password"
                    fontSize="28px"
                    top={['8px', null, '5px']}
                    right={['0', null, '-5px']}
                    zIndex="1000"
                    color={colorMode === 'light' ? '#ccc' : '#555'}
                    onClick={() => setNewPasswordShown(!newPasswordShown)}
                  >
                    {!newPasswordShown ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </Box>
                <FormErrorMessage>
                  {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" mt="20px">
                Change Password
              </Button>
            </form>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ChangePasswordForm
