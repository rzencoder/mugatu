import { Navigation, Footer } from '../components'
import { Box, Flex } from '@chakra-ui/react'

export default function Layout({ children }): JSX.Element {
  return (
    <Box>
      <Navigation />
      {children}
      <Footer />
    </Box>
  )
}
