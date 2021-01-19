import { useProducts } from '@/context/productsContext'
import { useWishlist } from '@/context/wishlistContext'
import { Box, Flex, Link, useColorMode, Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect } from 'react'

export default function Products({ products }) {
  const { colorMode } = useColorMode()
  const { addToWishlist } = useWishlist()
  const toast = useToast()
  const { gender, updateGender } = useProducts()
  const router = useRouter()

  console.log(products)
  useEffect(() => {
    const paths = router.asPath.split('/')
    paths[1] === 'women' ? updateGender('female') : updateGender('male')
  }, [gender])

  if (!products) return null

  return (
    <Flex direction="column">
      <Flex flexWrap="wrap" justifyContent={['center', null, null, 'flex-start']}>
        {products.map((el) => {
          return (
            <Flex
              key={el.name}
              width={['50%', null, '33%', '25%']}
              minWidth={['140px']}
              maxWidth="450px"
              p={['5px', null, null, '5px 15px']}
              flexDirection="column"
              justifyContent="space-between"
            >
              <NextLink
                href={`/${gender === 'female' ? 'women' : 'men'}/catalog/${el.slug}`}
                passHref
              >
                <Link
                  textTransform="lowercase"
                  fontSize={['16px', null, '18px', '20px']}
                  mb="10px"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Image width={500} height={750} src={el.image.url} alt={el.name} />
                </Link>
              </NextLink>
              <Flex p={1} direction="column" justifyContent="space-between" height="100%">
                <Box textTransform="lowercase"> {el.name}</Box>
                <Flex
                  flexDirection="row"
                  m="10px 0"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Flex alignItems="flex-start">
                    <Box fontSize={['16px', '18px', '20px']} color="mainRed">
                      £{el.price}
                    </Box>
                    <Box
                      color="#777"
                      fontSize={['12px', '14px', '16px']}
                      textDecoration="line-through"
                      ml={['5px', null, null, '10px']}
                      mt="2px"
                    >
                      £{el.rrp}
                    </Box>
                  </Flex>
                  <Button
                    variant="transparentBg"
                    onClick={(e) => {
                      e.preventDefault()
                      const result = addToWishlist(el)
                      if (result) {
                        toast({
                          title: 'Item added to your wishlist',
                          status: 'success',
                          duration: 3000,
                          isClosable: true,
                        })
                      }
                    }}
                    height="20px"
                    width="20px"
                    minWidth="0"
                    backgroundImage="url(/icons/heart.png)"
                    filter={colorMode === 'light' ? 'invert()' : 'none'}
                    backgroundSize="cover"
                    position="relative"
                    zIndex="10"
                  />
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}
