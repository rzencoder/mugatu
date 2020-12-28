import { extendTheme } from '@chakra-ui/react'
import { Button } from './components'

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
  components: {
    Button,
  },
}

export const theme = extendTheme(styles)
