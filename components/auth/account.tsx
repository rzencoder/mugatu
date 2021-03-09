import { firebaseClient } from '@/firebase/firebaseClient'
import { Box, Button, Flex, Heading, useColorMode, useDisclosure, Avatar } from '@chakra-ui/react'
import { useAuth } from '@/context/authContext'
import { ExitIcon } from '@/components/icons/'
import { DeleteIcon, InfoIcon, LockIcon } from '@chakra-ui/icons'
import ChangePasswordForm from './changePasswordForm'
import { Loader } from '..'
import Details from './details'
import DeleteAccountAlert from './deleteAccountAlert'
import { useState } from 'react'

const Account = (): JSX.Element => {
  const passwordModal = useDisclosure()
  const detailsModal = useDisclosure()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const { colorMode } = useColorMode()
  const { user } = useAuth()

  const onDeleteAlertClose = () => setShowDeleteAlert(false)

  if (!user || !user.displayName) {
    return <Loader />
  }

  return (
    <Flex
      direction="column"
      justifyContent="center"
      width="100%"
      alignItems="center"
      bg={colorMode === 'light' ? '#f7f7f7' : '#000'}
    >
      <Heading as="h2" fontWeight="600" p="50px 0 30px" fontSize="36px" textAlign="center">
        my account
      </Heading>
      <Flex
        direction="column"
        p="20px 30px"
        width={['90%', null, '50%']}
        margin="20px 0"
        bg={colorMode === 'light' ? '#fff' : '#111'}
      >
        <Flex direction="column" width="100%">
          <Avatar
            name={user && user.displayName}
            margin="10px auto"
            fontWeight="700"
            bg="#1aece3"
            size="lg"
          />
          <Box
            textTransform="lowercase"
            fontWeight="500"
            fontSize="28px"
            textAlign="center"
            p="15px 0"
          >
            Hey {user && user.displayName}
          </Box>
          <Flex direction="column" margin="20px 0">
            <Button variant="basic" m="5px 0" onClick={detailsModal.onOpen}>
              <InfoIcon mr="10px" width="30px" color={colorMode === 'light' ? '#222' : '#fff'} />
              <Box>my details</Box>
            </Button>
            <Details
              onClose={detailsModal.onClose}
              isOpen={detailsModal.isOpen}
              userName={user.displayName}
              userEmail={user.email}
            />
            <Button variant="basic" m="5px 0" onClick={passwordModal.onOpen}>
              <LockIcon mr="10px" width="30px" color={colorMode === 'light' ? '#222' : '#fff'} />
              <Box>change password</Box>
            </Button>
            <ChangePasswordForm onClose={passwordModal.onClose} isOpen={passwordModal.isOpen} />
            <Button variant="basic" m="5px 0" onClick={() => setShowDeleteAlert(true)}>
              <DeleteIcon mr="10px" width="30px" color={colorMode === 'light' ? '#222' : '#fff'} />
              <Box>delete account</Box>
            </Button>
            <DeleteAccountAlert isOpen={showDeleteAlert} onClose={onDeleteAlertClose} />
            <Button
              m="5px 0"
              variant="basic"
              onClick={async () => {
                await firebaseClient.auth().signOut()
                window.location.href = '/'
              }}
            >
              <Box width="30px" height="30px" mr="10px">
                <ExitIcon fill={colorMode === 'light' ? '#222' : '#fff'} />
              </Box>
              <Box>Sign out</Box>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Account
