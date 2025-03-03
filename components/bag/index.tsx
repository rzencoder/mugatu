import { useAuth } from '@/context/authContext'
import { useBag } from '@/context/bagContext'
import { BagItem as BagItemProps } from '@/types/bagItem'
import { calculateSubTotal } from '@/utils/bag'
import { Flex, Box, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Loader } from '..'
import BagItem from './bagItem'
import EmptyBag from './emptyBag'
import Summary from './summary'

const Bag = (): JSX.Element => {
  const { bag, fetchBag } = useBag()
  const { colorMode } = useColorMode()
  const subtotal = calculateSubTotal(bag)
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && user.displayName) {
      const getBag = async () => {
        setLoading(true)
        await fetchBag()
        setLoading(false)
      }
      getBag()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (loading) {
    return <Loader />
  }

  if (!bag || bag.length === 0) {
    return <EmptyBag />
  }

  return (
    <Box bg={colorMode === 'light' ? '#eee' : 'mainBlack'}>
      <Flex
        direction={['column', null, 'row']}
        maxWidth="1000px"
        minHeight="500px"
        margin="0 auto"
        padding={['15px 5px', '20px']}
        justifyContent="space-between"
        position="relative"
      >
        <Flex width={['100%', null, '60%']} direction="column" mr={['5px', '20px']}>
          <Flex
            direction="column"
            p={['15px 10px', '20px']}
            mb="20px"
            bg={colorMode === 'light' ? 'mainWhite' : '#111'}
          >
            <Box p="0 0 15px" fontWeight="600" fontSize="28px">
              my bag
            </Box>
            {bag.map((item: BagItemProps) => {
              return <BagItem key={`bag-item-${item.id}`} item={item} />
            })}
          </Flex>
          <Flex
            display={['none', null, 'flex']}
            justifyContent="space-between"
            bg={colorMode === 'light' ? 'mainWhite' : '#111'}
            p="20px"
            fontSize="22px"
            fontWeight="600"
          >
            <Box>sub-total</Box>
            <Box>£{subtotal}</Box>
          </Flex>
        </Flex>
        <Summary subtotal={subtotal} />
      </Flex>
    </Box>
  )
}

export default Bag
