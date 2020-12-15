import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'

const styles = {
  colors: {
    brand: {
      100: '#f00',
      // ...
      900: '#1a202c',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'light' ? '#000' : '#fff',
        bg: props.colorMode === 'light' ? 'brand.100' : '#ff0',
        fontFamily: 'Poppins',
      },
      flex: {},
    }),
  },
}

const theme = extendTheme(styles)

function MyApp({ Component, pageProps }): AppProps {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
