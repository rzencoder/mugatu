const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    color: 'mainWhite',
    borderRadius: '0',
    transition: 'all 0.3s',
    _hover: {
      backgroundColor: 'rgba(255,255,255,0.2) !important',
      opacity: 1,
    },
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: '18px',
      padding: '20px',
    },
    md: {
      fontSize: '22px',
      padding: '24px',
    },
    lg: {
      fontSize: '26px',
      padding: '28px',
    },
    xl: {
      fontSize: '30px',
      padding: '32px',
    },
  },
  // Two variants: outline and solid
  variants: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    outline: (props: any) => ({
      border: '2px solid',
      borderColor: props.colorMode === 'light' ? 'mainBlack' : 'mainWhite',
    }),
    icon: {
      backgroundSize: 'contain',
      width: ['25px', null, '30px'],
      height: ['25px', null, '30px'],
      padding: '5px',
      margin: ['0 10px', null, '0 15px'],
      minWidth: 'none',
      _hover: {
        backgroundColor: 'none',
      },
    },
    jumbo: {
      color: 'mainWhite',
      border: 'none',
      backgroundSize: 'contain',
      width: 'fit-content',
      height: 'fit-content',
      padding: '14px 30px',
      margin: '0',
      minWidth: 'none',
      fontFamily: 'Montserrat',
      transform: 'skewX(-5deg)',
      _hover: {
        backgroundColor: 'none',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transparentBg: (props: any) => ({
      fontWeight: '400',
      p: '0',
      border: 'none',
      textTransform: 'lowercase',
      color: props.colorMode === 'light' ? 'mainBlack' : 'mainWhite',
      _hover: {
        backgroundColor: 'none',
        color: props.colorMode === 'light' ? '#888' : '#ddd',
      },
    }),
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}

export default Button
