import { ChevronDownIcon, InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { deliveryOptions } from '../../data/deliveryOptions'
import { useEffect, useState } from 'react'
import { useBag } from '@/context/bagContext'

interface Props {
  subtotal: number
}

const Summary = ({ subtotal }: Props): JSX.Element => {
  const { colorMode } = useColorMode()
  const { bag } = useBag()
  const [delivery, setDelivery] = useState(deliveryOptions[0])

  // Update delivery prices based on items subtotal
  useEffect(() => {
    if (subtotal > 50) {
      if (delivery.name === 'standard delivery' || delivery.name === 'click and collect standard') {
        if (delivery.price !== 0) {
          setDelivery({ ...delivery, price: 0 })
        }
      }
    } else {
      if (delivery.price === 0) {
        const originalPrice = deliveryOptions.find((option) => option.name === delivery.name)
        setDelivery({ ...delivery, price: originalPrice.price })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bag, delivery])

  return (
    <Flex
      width={['100%', null, '40%']}
      direction="column"
      height={['350px']}
      bg={colorMode === 'light' ? 'mainWhite' : '#111'}
      p="20px"
      justifyContent="space-between"
    >
      <Box p="0 0 15px" fontWeight="600" fontSize="28px">
        summary
      </Box>
      <Flex direction="column" fontSize="16px">
        <Flex justifyContent="space-between" fontWeight="600">
          <Box>sub-total</Box>
          <Box>£{subtotal}</Box>
        </Flex>
        {subtotal < 50 && (
          <Flex
            bg={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
            color={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
            p="8px 12px"
            alignItems="center"
            margin="10px 0"
            fontWeight="600"
          >
            <InfoIcon fontSize="22px" mr="15px" />
            <Box>{`spend £${(50 - subtotal).toFixed(2)} more to qualify for free delivery`}</Box>
          </Flex>
        )}
        <Flex direction="column">
          <Flex justifyContent="space-between" fontWeight="600">
            <Box>delivery</Box>
            <Box>{delivery.price === 0 ? 'free' : `£${delivery.price}`}</Box>
          </Flex>
          <Menu>
            <MenuButton
              textAlign="left"
              as={Button}
              border="none"
              textTransform="lowercase"
              p="0"
              fontWeight="400"
              fontSize="16px"
            >
              <Box as="span">{`${delivery.name} (${
                delivery.price === 0 ? 'free' : `£${delivery.price}`
              })`}</Box>
              <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              {deliveryOptions.map((option, index) => {
                const price = option.name === delivery.name ? delivery.price : option.price
                return (
                  <MenuItem
                    key={`delivery-option-${option.name}`}
                    onClick={() => setDelivery(deliveryOptions[index])}
                  >
                    {`${option.name} (${price === 0 ? 'free' : `£${price}`})`}
                  </MenuItem>
                )
              })}
            </MenuList>
          </Menu>
        </Flex>
        <Flex justifyContent="space-between" fontSize="22px" fontWeight="600" p="5px 0">
          <Box>total</Box>
          <Box>£{(subtotal + delivery.price).toFixed(2)}</Box>
        </Flex>
      </Flex>
      <NextLink href="/checkout" passHref>
        <Link>
          <Button
            bg="#0d6d33"
            border="none"
            color="mainWhite"
            width="100%"
            _hover={{
              bg: '#15ab51',
            }}
          >
            Checkout
          </Button>
        </Link>
      </NextLink>
    </Flex>
  )
}

export default Summary
