import { Item } from '@/types/item'
import { Flex } from '@chakra-ui/react'
import { ProductItem } from '.'

interface ProductsProps {
  products: Item[]
}

export default function Products({ products }: ProductsProps): JSX.Element {
  if (!products || products.length === 0) return null

  return (
    <Flex direction="column">
      <Flex
        flexWrap="wrap"
        justifyContent={[products.length === 1 ? 'center' : 'flex-start', 'flex-start']}
      >
        {products.map((product) => {
          return <ProductItem key={product.slug} product={product} />
        })}
      </Flex>
    </Flex>
  )
}
