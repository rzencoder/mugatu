import { CheckCircleIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/react'

const getToastColour = (status: string) => {
  switch (status) {
    case 'success':
      return '#259a54'
    case 'error':
      return '#c51313'
    default:
      return '#1150af'
  }
}

const getToastIcon = (status: string) => {
  const props = { w: '6', h: '6' }
  switch (status) {
    case 'success':
      return <CheckCircleIcon {...props} />
    case 'error':
      return <WarningIcon {...props} />
    default:
      return <InfoIcon {...props} />
  }
}

interface ToastProps {
  title: string
  message?: string
  status: string
}

const Toast = ({ title, message = '', status }: ToastProps): JSX.Element => {
  return (
    <Box
      color="mainWhite"
      bg={getToastColour(status)}
      p="15px 30px 15px 20px"
      borderRadius="8px"
      fontSize={['16px', null, '18px']}
      maxWidth="600px"
      margin="0 10px"
      fontFamily="Poppins"
    >
      <Flex>
        {getToastIcon(status)}
        <Box ml="10px" mt={['0', null, '-2px']}>
          <Box fontWeight="700">{title}</Box>
          {message && <Box>{message}</Box>}
        </Box>
      </Flex>
    </Box>
  )
}

export default Toast
