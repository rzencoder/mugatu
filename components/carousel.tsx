import { Box, Flex, Link, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import { useProducts } from '@/context/productsContext'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import NextLink from 'next/link'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const CarouselComponent = ({ products }) => {
  const { colorMode } = useColorMode()

  return (
    <Box width="80%" margin="30px auto">
      <Box fontSize="30px" textAlign="center" p="20px 5px 30px" fontWeight="700">
        <span role="img" aria-label="">
          🔥
        </span>{' '}
        hot right now
      </Box>
      {products.length > 0 && (
        <Slider {...settings}>
          {products.map((product) => {
            return (
              <NextLink
                key={`carousel-${product.name}`}
                href={`/${product.gender === 'female' ? 'women' : 'men'}/catalog/${product.slug}`}
                passHref
              >
                <Link>
                  <Box
                    padding={['0 10px', '0 20px']}
                    textTransform="lowercase"
                    m={['0 auto', '0']}
                    maxWidth="250px"
                  >
                    <Image src={product.image.url} width="200px" height="300px" />
                    <Flex direction="column" maxWidth="200px" p="5px 0">
                      <Box>{product.name}</Box>
                      <Flex justifyContent="flex-start" p="5px 0">
                        <Box color="mainRed" fontSize="19px" fontWeight="700" mr="15px">
                          £{product.price}
                        </Box>
                        <Box
                          fontSize="15px"
                          textDecoration="line-through"
                          color={colorMode === 'light' ? '#777' : '#ccc'}
                        >
                          £{product.rrp}
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </Link>
              </NextLink>
            )
          })}
        </Slider>
      )}
    </Box>
  )
}

export default CarouselComponent
