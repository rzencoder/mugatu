import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Flex,
} from '@chakra-ui/react'

const MobileNavMenu = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex>
              <Box>women</Box>
              <Box>men</Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Box>Hello</Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default MobileNavMenu
