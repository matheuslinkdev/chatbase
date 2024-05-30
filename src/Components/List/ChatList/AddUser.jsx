import { Avatar, Box, Button, Flex, Heading, Icon, Input } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";


const AddUser = () => {
  return (
    <Box
      position="absolute"
      left={0}
      right={0}
      top={0}
      bottom={0}
      m="auto"
      width="max-content"
      height="max-content"
      zIndex={99999}
      borderRadius={20}
      bgColor="#063746ee"
      p={4}
    >
      <form>
        <Flex alignItems="center">

        <Input placeholder="Username" name="username" />
        <Icon as={IoIosSearch} ml={2}/>
        </Flex>
      </form>

      <Flex alignItems="center" p={2} justifyContent="space-between">
        <Avatar />
        <Heading size="md">The Rock</Heading>
        <Icon as={FaPlus} />
      </Flex>
    </Box>
  );
};

export default AddUser;
