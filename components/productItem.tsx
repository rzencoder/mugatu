import { useAuth } from '@/context/authContext'
import { useWishlist } from '@/context/wishlistContext'
import { Item } from '@/types/item'
import { Box, Flex, Link, useColorMode, Button, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import { LoginPopover, Toast } from '.'

const ProductItem = ({ product }: { product: Item }): JSX.Element => {
  const { addToWishlist } = useWishlist()
  const { user } = useAuth()
  const toast = useToast()
  const [showLoginPopover, setShowLoginPopover] = useState(false)
  const { colorMode } = useColorMode()

  const handleAddToWishlist = async () => {
    if (user && user.email) {
      const result = await addToWishlist(product)
      toast({
        duration: 3000,
        // eslint-disable-next-line react/display-name
        render: () => (
          <Toast title={result.title} message={result.message} status={result.status} />
        ),
      })
    } else {
      setShowLoginPopover(!showLoginPopover)
    }
  }

  return (
    <Flex
      key={product.name}
      width={['50%', null, '33%', '25%']}
      minWidth={['140px']}
      maxWidth="450px"
      p={['5px', null, null, '5px 15px']}
      flexDirection="column"
      justifyContent="space-between"
    >
      <NextLink
        href={`/${product.gender === 'female' ? 'women' : 'men'}/catalog/${product.slug}`}
        passHref
      >
        <Link
          textTransform="lowercase"
          fontSize={['16px', null, '18px', '20px']}
          mb="10px"
          aria-label={product.name}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Image width={500} height={750} src={product.image.url} alt={product.name} />
        </Link>
      </NextLink>
      <Flex p={1} direction="column" justifyContent="space-between" height="100%">
        <Box textTransform="lowercase" textAlign="left">
          {product.name}
        </Box>
        <Flex
          flexDirection="row"
          m="10px 0"
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Flex alignItems="flex-start">
            <Box
              fontSize={['16px', '18px', '20px']}
              color={colorMode === 'light' ? 'mainRed' : 'mainRedDM'}
            >
              £{product.price}
            </Box>
            <Box
              color={colorMode === 'light' ? '#666' : '#999'}
              fontSize={['12px', '14px', '16px']}
              textDecoration="line-through"
              ml={['5px', null, null, '10px']}
              mt="2px"
            >
              £{product.rrp}
            </Box>
          </Flex>
          <Box className={showLoginPopover && 'login-popup-container'}>
            <Button
              variant="transparentBg"
              aria-label="add to wishlist"
              onClick={handleAddToWishlist}
              height="20px"
              width="20px"
              minWidth="0"
              backgroundImage="url(/icons/heart.png)"
              filter={colorMode === 'light' ? 'invert()' : 'none'}
              backgroundSize="cover"
              position="relative"
              zIndex="1"
            />
            <LoginPopover
              showLoginPopover={showLoginPopover}
              setShowLoginPopover={setShowLoginPopover}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductItem
