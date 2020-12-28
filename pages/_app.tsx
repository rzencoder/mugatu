import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ProvideGender } from '../context/genderContext'
import { ProvideBag } from '../context/bagContext'
import { theme } from '../styles/chakraTheme'

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
