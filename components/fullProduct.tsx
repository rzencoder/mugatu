import { Box, Button, Flex, Heading, useColorMode, Input } from '@chakra-ui/react'
import { useBag } from '../context/bagContext'
import { ProductData } from '../types/productData'
import Image from 'next/image'
import { useState } from 'react'

const FullProduct = ({ productData }: { productData: any }): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { name, id, image, price, rrp, colour, sizes, popular } = productData
  const { bag, addToBag } = useBag()
  const { colorMode } = useColorMode()
  console.log(bag)

  const handleAddToBag = () => {
    const product = { name, id, selectedSize, quantity }
    addToBag(product)
  }

  const displayStockMessage = () => {
    if (!selectedSize) return null
    const { stock } = sizes.filter((el) => el.size === selectedSize)[0]
    console.log(stock)
    let stockMessage = ''
    let color = ''
    if (stock < 1) {
      stockMessage = 'OUT OF STOCK'
      color = '#d80808'
    } else if (stock < 6) {
      stockMessage = 'LOW STOCK'
      color = '#d80808'
    } else {
      stockMessage = 'IN STOCK'
      color = 'inherit'
    }
    return (
      <Box as="span" color={color}>
        {stockMessage}
      </Box>
    )
  }

  return (
    <Flex
      flexDirection={['column', null, 'row']}
      alignItems={['center']}
      margin={['0px', '20px', '40px']}
      justifyContent={[null, null, 'center']}
    >
      <Box width={['100%', '400px']} position="relative" mr={[null, null, '20px', '80px']}>
        <Image width={600} height={900} src={image.url} />
        {popular && (
          <Box
            bg={colorMode === 'dark' ? 'mainWhite' : 'mainBlack'}
            color={colorMode === 'dark' ? 'mainBlack' : 'mainWhite'}
            pos="absolute"
            bottom="20px"
            right="0"
            fontWeight="700"
            p={2}
            borderRadius="10px 0 0 10px"
          >
            <span role="img" aria-label="">
              🔥
            </span>{' '}
            hot right now
          </Box>
        )}
      </Box>

      <Flex
        flexDirection="column"
        p={[3, 4]}
        width={['100%', '85%']}
        maxWidth={[null, null, '450px']}
      >
        <Heading
          as="h2"
          textTransform="lowercase"
          fontWeight="400"
          minHeight={[null, null, '85px']}
        >
          {name}
        </Heading>
        <Flex alignItems="center" margin="10px 0 0">
          <Box color="#d80808" fontSize={['26px', '28px']} mr="5px">
            £{price}
          </Box>
          <Box textDecoration="line-through" color="#aaa" fontSize="14px" mt="-10px">
            rrp £{rrp}
          </Box>
        </Flex>
        <Box margin="5px 0 0">
          <Box as="span" fontWeight="700">
            colour:
          </Box>{' '}
          {colour}
        </Box>
        <Flex direction="column">
          <Box margin="10px 0 5px">
            <Box as="span" fontWeight="700">
              size:
            </Box>{' '}
            <Box as="span" textTransform="uppercase">
              {selectedSize}
            </Box>
          </Box>
          <Flex wrap="wrap">
            {sizes.map((el) => (
              <Button
                disabled={el.stock === 0}
                onClick={() => setSelectedSize(el.size.toString())}
                key={`size-${el.size}`}
                bg={colorMode === 'light' ? '#ddd' : '#333'}
                borderColor={
                  el.size.toString() === selectedSize
                    ? colorMode === 'light'
                      ? 'mainBlack'
                      : 'mainWhite'
                    : 'transparent'
                }
                padding={0}
                fontSize={['16px']}
                margin={1}
                _hover={{
                  bg: colorMode === 'light' ? '#ccc' : '#444',
                }}
              >
                {el.size}
              </Button>
            ))}
          </Flex>
        </Flex>
        <Box minHeight="40px" padding="10px 0 0" fontWeight="700" fontSize="20px">
          {displayStockMessage()}
        </Box>
        <Flex alignItems="flex-end" margin="10px 0">
          <Flex direction="column" textAlign="center">
            <Box mb="5px">quantity</Box>
            <Input
              name="quantity"
              value={quantity}
              onChange={(event) => setQuantity(parseInt((event.target as HTMLInputElement).value))}
              width="50px"
              textAlign="center"
              marginLeft="5px"
              height="52px"
              border="2px solid #444"
              borderRadius="0"
              fontSize="18px"
              fontWeight="700"
            />
          </Flex>
          <Button
            onClick={handleAddToBag}
            disabled={selectedSize === ''}
            height="50px"
            minWidth="calc(100% - 120px)"
            bg="transparent"
            borderColor={colorMode === 'light' ? 'mainBlack' : 'mainWhite'}
            fontSize={['20px', '24px']}
            _hover={{
              bg: colorMode === 'light' ? '#eee' : '#111',
              borderColor: colorMode === 'light' ? '#222' : '#ddd',
            }}
          >
            {selectedSize ? 'Add to Bag' : 'Select UK Size'}
          </Button>
          <Flex height="50px" width="50px" padding="9px" margin="0 5px">
            <Box
              backgroundImage="url(/icons/heart.png)"
              filter={colorMode === 'light' ? 'invert()' : 'none'}
              backgroundSize="contain"
              width="inherit"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FullProduct
