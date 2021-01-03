import { Box, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'

const initialOptions = [
  { name: 'product', open: false, items: ['coats', 'shirts'] },
  { name: 'colour', open: false, items: ['red', 'yellow'] },
  { name: 'size', open: false, items: ['8', '10', 'M'] },
]

export default function Filter(): JSX.Element {
  const [options, setOptions] = useState(initialOptions)
  const [showFilter, setShowFilter] = useState(false)

  const handleOptionToggle = (value) => {
    const updatedOptions = options.map((el) => {
      if (el.name === value && !el.open) {
        return { ...el, open: true }
      }
      return { ...el, open: false }
    })
    setOptions(updatedOptions)
  }

  return (
    <Flex>
      <Button
        fontWeight="400"
        fontSize="20px"
        color="mainBlack"
        border="none"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filter
      </Button>
      <Flex display={showFilter ? 'flex' : 'none'}>
        {options.map((el) => (
          <Box key={el.name}>
            <Button
              textTransform="capitalize"
              value={el.name}
              onClick={(event) => handleOptionToggle((event.target as HTMLInputElement).value)}
            >
              {el.name}
            </Button>
            <Box display={el.open === true ? 'block' : 'none'} bg="mainRed" width="100px">
              {el.items.map((item) => (
                <Box key={item}>{item}</Box>
              ))}
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}
