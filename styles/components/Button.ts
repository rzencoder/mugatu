const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    color: 'mainWhite',
    borderRadius: '0',
    transition: 'all 0.3s',
    _hover: {
      backgroundColor: 'rgba(255,255,255,0.1) !important',
      opacity: 1,
    },
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: '12px',
      padding: '16px',
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
    outline: {
      border: '2px solid',
      borderColor: '#fff',
    },
    icon: {
      backgroundSize: 'contain',
      width: '25px',
      height: '25px',
      padding: '5px',
      margin: '0 10px',
      minWidth: 'none',
      _hover: {
        backgroundColor: 'none',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
}

export default Button
