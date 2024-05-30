import { Avatar, Flex, Heading, Icon, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AddUser from "./AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  return (
    <Flex flexDir="column" flex={1} overflowY="auto">
      <Flex alignItems="center" gap="15px">
        <Flex alignItems="center" flex={1}>
          <Icon as={IoMdSearch} />
          <Input placeholder="Search" bgColor="blue.400" border="none" />
        </Flex>
        <Icon
          as={addMode ? FaMinus : FaPlus}
          onClick={() => setAddMode(!addMode)}
        />
      </Flex>
      <Flex p="15px">
        <Avatar />
        <Flex flexDir="column" ml={2}>
          <Heading size="md">Jane Doe</Heading>
          <Text>Last Message</Text>
        </Flex>
      </Flex>
      { addMode && <AddUser />}
    </Flex>
  );
};

export default ChatList;
