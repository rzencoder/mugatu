import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image from 'next/image'

interface BannerProps {
  colour: string
  bgColour: string
  imageSrc: string
  title: string
  text: string
  linkHref: string
}

const Banner = ({
  colour,
  bgColour,
  imageSrc,
  title,
  text,
  linkHref,
}: BannerProps): JSX.Element => {
  return (
    <Box
      height={['160px', '200px', '250px', '300px']}
      fontFamily="Montserrat"
      fontSize="80px"
      color="white"
      textAlign="center"
      position="relative"
    >
      <Image className="banner-bg" src={imageSrc} layout="fill" role="presentation" />
      <Box top="0" width="100%" height="100%" bg={bgColour} opacity="0.6" position="absolute"></Box>
      <NextLink href={linkHref} passHref>
        <Link>
          <Flex
            position="absolute"
            top="0"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Flex display="column" justifyContent="center" textAlign="center" m="35px 0 15px">
              <Box
                bg={colour}
                transform="skewX(-5deg)"
                fontSize={['24px', '35px', '50px', '60px']}
                p="0 20px"
                width="fit-content"
                m="0 auto"
              >
                {title}
              </Box>
              <Box fontSize={['28px', '40px', '60px', '80px']} m="20px auto 5px">
                {text}
              </Box>
            </Flex>
          </Flex>
        </Link>
      </NextLink>
    </Box>
  )
}

export default Banner
