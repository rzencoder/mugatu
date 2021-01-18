import { Breadcrumb as BreadcrumbContainer, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

const Breadcrumb = () => {
  const router = useRouter()

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
  const formatLinkHref = (paths, index) => {
    const path = [...paths]
    path.length = index + 1
    if (path.length === 1) return '/'
    path.shift()
    const pathResult = path.map((el) => `/${el}`)
    return pathResult.join('')
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
      {paths.map((path, index) => {
        return (
          <BreadcrumbItem key={path} color={index === paths.length - 1 && '#777'}>
            <Link href={formatLinkHref(paths, index)} passHref>
              <BreadcrumbLink>{path.split('-').join(' ')}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        )
      })}
    </BreadcrumbContainer>
  )
}

export default Breadcrumb
