import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ProvideBag } from '../context/bagContext'
import { theme } from '../styles/chakraTheme'
import { ProvideWishlist } from '@/context/wishlistContext'
import { ProvideSearch } from '@/context/searchContext'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
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
  )
}

export default MyApp
