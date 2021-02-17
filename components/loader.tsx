import { Flex, Spinner } from '@chakra-ui/react'

const Loader = (): JSX.Element => {
  return (
    <Flex width="100%" height={['380px', '480px']} justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  )
}

export default Loader
