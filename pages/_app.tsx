import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ProvideBag } from '../context/bagContext'
import { theme } from '../styles/chakraTheme'
import { ProvideProducts } from '@/context/productsContext'
import { ProvideWishlist } from '@/context/wishlistContext'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <ProvideProducts>
      <ProvideBag>
        <ProvideWishlist>
          <ChakraProvider theme={theme}>
            <CSSReset />
            <Component {...pageProps} />
          </ChakraProvider>
        </ProvideWishlist>
      </ProvideBag>
    </ProvideProducts>
  )
}

export default MyApp
