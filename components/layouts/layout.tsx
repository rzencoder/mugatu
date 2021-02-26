import { Navigation, Footer, Breadcrumb } from '..'
import { Box } from '@chakra-ui/react'

interface LayoutProps {
  children: React.ReactNode
  bg?: string
}

export default function Layout({ children, bg }: LayoutProps): JSX.Element {
  return (
    <Box bg={bg}>
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
