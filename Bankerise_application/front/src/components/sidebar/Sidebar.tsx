import React from "react";
import { AvatarBox } from "./components/avatarBox";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Content from "components/sidebar/components/Content";
import { Scrollbars } from "react-custom-scrollbars-2";

// Assets
import { IoMenuOutline } from "react-icons/io5";

function Sidebar(props: { routes: RoutesType[]; display?: string }) {
  const { routes } = props;

  const scrollbarStyles = `
    /* Barre de défilement */
    ::-webkit-scrollbar {
      width: 7px; /* Changer la largeur de la barre de défilement */
    }

    /* Poignée de défilement */
    ::-webkit-scrollbar-thumb {
      background-color: rgba(222, 222, 222, 1);
      border-radius: 10px; /* Changer la courbure des coins de la poignée */
    }
  `;

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="300px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <style>{scrollbarStyles}</style>
        <Box w="300px" h="90vh">
          <Scrollbars
            autoHide
            renderThumbVertical={() => (
              <Box
                bg="rgba(222, 222, 222, 0.1)"
                borderRadius="10px"
                width="8px"
              />
            )}
            renderView={() => <Box flexGrow={1} />}
          >
            <Content routes={routes} />
          </Scrollbars>
          <AvatarBox />
        </Box>
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props: { routes: RoutesType[] }) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
     </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderThumbVertical={() => (
                <Box
                  bg="rgba(222, 222, 222, 0.1)"
                  borderRadius="10px"
                  width="8px"
                />
              )}
              renderView={() => <Box flexGrow={1} />}
            >
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
