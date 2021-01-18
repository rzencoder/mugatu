import { extendTheme } from '@chakra-ui/react'
import Button from './components/Button'
// import Link from './components/Link'
import Heading from './components/Heading'

const styles = {
  colors: {
    mainBlack: '#000',
    mainWhite: '#fff',
    mainRed: '#d80808',
    teal: { 200: '#10aed2' },
    pink: { 200: '#b52950' },
  },
  styles: {
    global: (props) => ({
      body: {
        color: props.colorMode === 'light' ? 'mainBlack' : 'mainWhite',
        bg: props.colorMode === 'light' ? 'mainWhite' : 'mainBlack',
        fontFamily: 'Poppins',
      },
      flex: {},
    }),
  },
  components: {
    Button,
    Heading,
  },
}

export const theme = extendTheme(styles)
