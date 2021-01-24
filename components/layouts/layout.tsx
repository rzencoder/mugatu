import { Navigation, Footer, Breadcrumb } from '..'
import { Box } from '@chakra-ui/react'

export default function Layout({ children }: any): JSX.Element {
  return (
    <Box>
      <Navigation />
      <Breadcrumb />
      <Box minHeight="500px">{children}</Box>
      <Footer />
    </Box>
  )
}
