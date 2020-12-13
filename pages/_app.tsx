import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, theme } from '@chakra-ui/react'

function MyApp({ Component, pageProps }): AppProps {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
