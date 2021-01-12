import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ProvideBag } from '../context/bagContext'
import { theme } from '../styles/chakraTheme'
import { ProvideProducts } from '@/context/productsContext'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <ProvideProducts>
      <ProvideBag>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ChakraProvider>
      </ProvideBag>
    </ProvideProducts>
  )
}

export default MyApp
