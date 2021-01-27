import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ProvideBag } from '../context/bagContext'
import { theme } from '../styles/chakraTheme'
import { ProvideProducts } from '@/context/productsContext'
import { ProvideWishlist } from '@/context/wishlistContext'
import { ProvideSearch } from '@/context/searchContext'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <ProvideProducts>
      <ProvideBag>
        <ProvideWishlist>
          <ProvideSearch>
            <ChakraProvider theme={theme}>
              <CSSReset />
              <Component {...pageProps} />
            </ChakraProvider>
          </ProvideSearch>
        </ProvideWishlist>
      </ProvideBag>
    </ProvideProducts>
  )
}

export default MyApp
