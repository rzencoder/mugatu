import {
  Breadcrumb as BreadcrumbContainer,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorMode,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

const Breadcrumb = (): JSX.Element => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  const getPaths = () => {
    const pathName = router.asPath.substring(1)
    const paths = pathName.split('/')
    return ['home', ...paths]
  }

  // Only display breadcrumb on longer nested paths
  const paths = getPaths()
  if (paths.length < 3) {
    return null
  }

  // Get the correct link href for each path
  const formatLinkHref = (paths: string[], index: number) => {
    const path = [...paths]
    path.length = index + 1
    if (path.length === 1) return '/'
    path.shift()
    const pathResult = path.map((el) => `/${el}`)
    return pathResult.join('')
  }

  const getBreadcrumbColor = (index: number, pathLength: number, colorMode: string): string => {
    if (index === pathLength - 1) {
      return colorMode === 'light' ? '#666' : '#aaa'
    } else {
      return colorMode === 'light' ? '#333' : 'mainWhite'
    }
  }

  return (
    <BreadcrumbContainer
      margin="15px auto 5px"
      padding="0 25px"
      width="100%"
      maxWidth="1200px"
      separator=">"
      display={['none', 'block']}
    >
      {paths.map((path: string, index: number) => {
        const pathLink = path.split('-').join(' ').split('?')
        const color = getBreadcrumbColor(index, paths.length, colorMode)
        return (
          <BreadcrumbItem key={path} color={color}>
            <Link href={formatLinkHref(paths, index)} passHref>
              <BreadcrumbLink>{pathLink[0]}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        )
      })}
    </BreadcrumbContainer>
  )
}

export default Breadcrumb
