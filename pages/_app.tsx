import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ProvideBag } from '@/context/bagContext'
import { theme } from '@/styles/chakraTheme'
import { ProvideWishlist } from '@/context/wishlistContext'
import { ProvideSearch } from '@/context/searchContext'
import { ProvideAuth } from '@/context/authContext'

function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props

  return (
    <ProvideAuth>
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
    </ProvideAuth>
  )
}

export default MyApp
