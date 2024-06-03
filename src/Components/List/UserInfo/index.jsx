import { Avatar, Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useUserStore } from "../../../lib/userStore";

const UserInfo = () => {

 const { currentUser } = useUserStore();

  return (
    <Flex alignItems="center" justifyContent="space-between" p={5}>
      <Flex alignItems="center" justifyContent="space-between" gap="20px">
        <Avatar src={currentUser ? currentUser.avatar : ""}/>
        <Heading size="md">{currentUser ? currentUser.username : ""}</Heading>
      </Flex>
      <Flex gap="15px" fontSize="20px">
        <Icon as={IoIosMore} />
        <Icon as={IoVideocam} />
        <Icon as={MdEdit} />
      </Flex>
    </Flex>
  );
};

export default UserInfo;
