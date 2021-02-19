const Link = {
  baseStyle: {
    textDecoration: 'none',
    transition: 'none',
  },
  variants: {
    container: { textDecoration: 'none' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer: (props: any) => ({
      padding: '2px 0',
      margin: '3px 0',
      _hover: {
        color: props.colorMode === 'light' ? '#777' : '#aaa',
      },
    }),
  },
  defaultProps: {
    variant: 'container',
  },
}

export default Link
