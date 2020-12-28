import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Jumbotron, Layout, Featured } from '../../components'
import { useGender } from '../../context/genderContext'

const items = [
  {
    name: 'dresses',
    link: '/women/catalog?category=dress',
    imageUrl: '/landing/women/dress.jpg',
    rotate: 4,
  },
  {
    name: 'skirts',
    link: '/women/catalog?category=skirt',
    imageUrl: '/landing/women/skirt.jpg',
    rotate: -3,
  },
  {
    name: 'tops',
    link: '/women/catalog?category=top',
    imageUrl: '/landing/women/top.jpg',
    rotate: 2.5,
  },
  {
    name: 'coats & jackets',
    link: '/women/catalog?category=coat',
    imageUrl: '/landing/women/coat.jpg',
    rotate: -3.5,
  },
]

export default function Women() {
  const { gender, setGender } = useGender()

  useEffect(() => {
    if (gender !== 'female') {
      setGender('female')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/women/women-header.jpg"
            buttonText="Shop Now"
            bgColor="#b0f"
          >
            Party season is here
          </Jumbotron>
          <Featured items={items} gender="female" />
        </Flex>
      </Layout>
    </>
  )
}
