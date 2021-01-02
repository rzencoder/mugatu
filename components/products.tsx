import { Box, Flex, Link, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Products({ products, gender }) {
  const { colorMode } = useColorMode()

  return (
    <Flex
      flexWrap="wrap"
      justifyContent={['center', null, null, 'flex-start']}
      margin={['20px 10px', '20px', '20px 30px']}
      maxWidth={['1300px']}
    >
      {products &&
        products.map((el) => {
          return (
            <Flex
              key={el.name}
              width={['50%', null, '33%', '25%']}
              minWidth={['140px']}
              maxWidth="450px"
              p={1}
              flexDirection="column"
              justifyContent="space-between"
            >
              <NextLink href={`/product/${el.slug}`} passHref>
                <Link
                  textTransform="lowercase"
                  fontSize={['16px', null, '18px', '20px']}
                  mb="20px"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Image width={500} height={750} src={el.image.url} alt={el.name} />
                  <Box p={1}>
                    <Flex
                      flexDirection="row"
                      mb="10px"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex alignItems="center">
                        <Box color="mainRed">£{el.price}</Box>
                        <Box
                          color="#777"
                          fontSize={['12px', '14px', '16px']}
                          textDecoration="line-through"
                          ml={['5px', null, null, '10px']}
                        >
                          £{el.rrp}
                        </Box>
                      </Flex>
                      <Box
                        height="20px"
                        width="20px"
                        backgroundImage="url(/icons/heart.png)"
                        filter={colorMode === 'light' ? 'invert()' : 'none'}
                        backgroundSize="cover"
                      />
                    </Flex>

                    <Box> {el.name}</Box>
                  </Box>
                </Link>
              </NextLink>
            </Flex>
          )
        })}
    </Flex>
  )
}
