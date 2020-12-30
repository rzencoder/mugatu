import { extendTheme } from '@chakra-ui/react'
import Button from './components/Button'
// import Link from './components/Link'

const styles = {
  colors: {
    mainBlack: '#000',
    mainWhite: '#fff',
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
  },
}

export const theme = extendTheme(styles)
