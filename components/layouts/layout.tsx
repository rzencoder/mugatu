import { Navigation, Footer, Breadcrumb } from '..'
import { Box } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box>
      <Navigation />
      <Breadcrumb />
      <Box minHeight="500px">{children}</Box>
      <Footer />
    </Box>
  )
}
