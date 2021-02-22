import { Navigation, Footer, Breadcrumb } from '..'
import { Box } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Box>
      <Box id="skip">
        <a href="#content">Skip to main content</a>
      </Box>
      <Navigation />
      <Breadcrumb />
      <Box minHeight="500px" id="content">
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
