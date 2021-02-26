import {
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from '@chakra-ui/react'
import NextLink from 'next/link'

type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'

interface PopoverProps {
  showLoginPopover: boolean
  setShowLoginPopover: (showLoginPopover: boolean) => void
  placement?: Placement
  pos?: {
    top: string
    right?: string
    left?: string
  }
}

const LoginPopover = ({
  showLoginPopover,
  setShowLoginPopover,
  pos = { top: '15px', right: '17px', left: 'unset' },
  placement = 'left',
}: PopoverProps): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={showLoginPopover}
      onClose={() => setShowLoginPopover(false)}
      placement={placement}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Link position="absolute" right={pos.right} top={pos.top} left={pos.left} zIndex="-1000">
          {''}
        </Link>
      </PopoverTrigger>
      <PopoverContent
        maxWidth={['250px', '350px']}
        bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
        padding="10px"
        border="2px solid"
        borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
        zIndex="initial"
      >
        <PopoverHeader fontWeight="600" border="none" fontSize="22px">
          account needed
        </PopoverHeader>
        <PopoverArrow bg={colorMode === 'light' ? 'mainBlack' : 'mainWhite'} />
        <PopoverCloseButton top="5px" right="5px" />
        <PopoverBody fontSize="15px">
          please{' '}
          <NextLink href="/login" passHref>
            <Link
              textDecoration="underline"
              _hover={{
                textDecoration: 'underline !important',
              }}
            >
              login
            </Link>
          </NextLink>{' '}
          or{' '}
          <NextLink href="/register" passHref>
            <Link
              textDecoration="underline"
              _hover={{
                textDecoration: 'underline !important',
              }}
            >
              register
            </Link>
          </NextLink>{' '}
          to add items to your wishlist
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default LoginPopover
