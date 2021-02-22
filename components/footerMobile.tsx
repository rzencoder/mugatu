import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Link,
  useColorMode,
} from '@chakra-ui/react'
import footerLinks from '@/data/footerLinks'
import NextLink from 'next/link'

const FooterMobile = () => {
  const { colorMode } = useColorMode()
  return (
    <Accordion allowToggle>
      {footerLinks.map((item) => {
        return (
          <AccordionItem key={`footer-mob-${item.title}`} border="none" padding="5px 0">
            <AccordionButton p="0" hover={{ bg: 'transparent' }}>
              <Box flex="1" textAlign="left" textTransform="lowercase">
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p="5px">
              <Flex direction="column">
                {item.links.map((link) => {
                  return (
                    <NextLink key={`footer-links-mob-${link.name}`} href={link.href} passHref>
                      <Link
                        color={colorMode === 'light' ? '#444' : '#ccc'}
                        padding="5px 0"
                        textTransform="lowercase"
                      >
                        {link.name}
                      </Link>
                    </NextLink>
                  )
                })}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default FooterMobile
