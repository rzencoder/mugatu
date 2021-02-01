import { Box, Flex, Link, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Featured({ items, gender }): JSX.Element {
  const { colorMode } = useColorMode()

  return (
    <Box width="100%" position="relative">
      <Box
        fontFamily="Permanent Marker"
        fontSize={['34px', '40px', '50px', '60px']}
        p="20px 0 0"
        textAlign="center"
        position="relative"
        zIndex="10"
        color={gender === 'female' ? '#ec2392' : '#222'}
      >
        <Box
          height="fit-content"
          bg="mainWhite"
          width="fit-content"
          p="0px 30px"
          margin="0 auto"
          transform="rotate(
-2deg
)"
        >
          shop by style
        </Box>
      </Box>
      <Box position="absolute" top="0" height="100%" width="100%" opacity="0.15">
        <Image src="/landing/women/women-bg.jpg" layout="fill" className="featured-bg" />
      </Box>
      <Flex wrap="wrap" justifyContent="center" width="100%" p={['20px 5px', '20px 15px']}>
        {items.map((item, index) => {
          return (
            <Flex
              width={['42%', '40%', null, '21%']}
              direction="column"
              margin={['20px 10px', '20px']}
              key={item.name}
              bg="#eee"
              alignItems="center"
              transform={`rotate(${item.rotate}deg)`}
              boxShadow="6px 6px 6px #111"
              position="relative"
            >
              <NextLink href={item.link} passHref>
                <Link>
                  <Box padding={['10px 10px 0', '20px 20px 0']} filter="saturate(0.7)">
                    <Image width={400} height={500} src={item.imageUrl} alt={item.title} />
                  </Box>
                  <Box
                    color={gender === 'female' ? '#ec2392' : '#222'}
                    fontFamily="Permanent Marker"
                    fontSize={['28px', '34px', '34px', '30px']}
                    textAlign="center"
                    p={['5px', '0 10px 10px']}
                  >
                    {item.name}
                  </Box>
                  {gender === 'female' && (
                    <Box
                      display={index % 2 === 0 ? 'none' : 'block'}
                      position="absolute"
                      bottom={['75px', null, '50px', '70px']}
                      right={`${index === 1 ? '10' : '50'}%`}
                      transform={`rotate(${index === 1 ? '-10' : '60'}deg)`}
                      backgroundImage="url(/landing/women/lipstick.png)"
                      width="40%"
                      backgroundSize="contain"
                      backgroundRepeat="no-repeat"
                      opacity="0.6"
                      height={['20%']}
                    ></Box>
                  )}
                </Link>
              </NextLink>
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
