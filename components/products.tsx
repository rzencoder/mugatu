import { Box, Flex, Link, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Products({ products, gender }) {
  const { colorMode } = useColorMode()

  if (!products) return null

  return (
    <Flex direction="column">
      <Box
        width="150px"
        margin={['10px auto 0', '-40px auto 15px']}
        textAlign="center"
        padding="0 0 10px"
        fontSize="18px"
      >{`${products.length} items found`}</Box>
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
    </Flex>
  )
}
