import { Navigation, Footer } from '..'
import { Box } from '@chakra-ui/react'

export default function Layout({ children }: any): JSX.Element {
  return (
    <Box>
      <Navigation />
      {children}
      <Footer />
    </Box>
  )
}
