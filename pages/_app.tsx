import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react'
import { ProvideGender } from '../context/genderContext'
import { ProvideBag } from '../context/bagContext'

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
        bg: props.colorMode === 'light' ? '#fff' : '#000',
        fontFamily: 'Poppins',
      },
      flex: {},
    }),
  },
}

const theme = extendTheme(styles)

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <ProvideBag>
      <ProvideGender>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ChakraProvider>
      </ProvideGender>
    </ProvideBag>
  )
}

export default MyApp
