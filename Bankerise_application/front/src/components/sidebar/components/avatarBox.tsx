import React from "react";
import { Avatar, Box, Flex, IconButton, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";

export const AvatarBox = () => {
  return (
    <Flex
      borderWidth={1}
      borderColor="gray.100"
      borderRadius="full"
      w="full"
      p={2}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexDirection="row"
    >
      <Avatar bg="#67C3D7" />
      <Flex
        w="full"
        flexDirection="column"
        gap={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
          Admin Dashboard
        </Text>
        <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
          Bankerise
        </Text>
      </Flex>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Settings"
          icon={<MdOutlineMoreHoriz />}
          borderRadius="full"
          color="gray.400"
          variant="ghost"
          fontSize={20}
        />
        <MenuList>
          <MenuItem>
            <Text fontSize="sm" fontWeight="bold" textTransform="uppercase" sx={{ fontSize: "14px" }}>
              Logout
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
