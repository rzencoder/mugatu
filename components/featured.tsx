import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Featured({ items, gender }): JSX.Element {
  return (
    <Flex wrap="wrap" width="100%" justifyContent="center" position="relative">
      <Box
        position="absolute"
        top="0"
        height="100%"
        width="100%"
        backgroundImage={`url('/landing/women/women-bg.jpg')`}
        backgroundSize="cover"
        opacity="0.15"
      />
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
  )
}
