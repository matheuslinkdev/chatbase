import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsDownload } from "react-icons/bs";
import { useState } from "react";
import { auth } from "../../lib/firebase";

const Details = () => {
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);

  return (
    <Flex flex={1} flexDir="column">
      <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" p={2}>
        <Avatar />
        <Heading size="md">Jane Doe</Heading>
        <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Text>
      </Box>
      <Box display="flex" flexDir="column" gap="15px" px={2} my={4}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          fontWeight={600}
        >
          <Text>Chat Settings</Text>
          <Icon as={SlArrowDown} fontSize="14px" />
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          fontWeight={600}
        >
          <Text>Privacy & Help</Text>
          <Icon as={SlArrowDown} fontSize="14px" />
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          fontWeight={600}
          onClick={() => setIsPhotosOpen(!isPhotosOpen)}
        >
          <Text>Shared Photos</Text>
          <Icon as={isPhotosOpen ? SlArrowUp : SlArrowDown} fontSize="14px" />
        </Flex>
      </Box>
      {isPhotosOpen && (
        <Box display="flex" flexDir="column" gap="15px" my={2}>
          <Flex justifyContent="space-between" alignItems="center" px={2}>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2-U2-ChuTauggkwXu9K6WhxJZlsZFWEbqg&s"
              w="35px"
              h="35px"
              objectFit="cover"
              borderRadius={5}
            />
            <Text>Photo-jajajaja.png</Text>
            <Icon as={BsDownload} />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" px={2}>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2-U2-ChuTauggkwXu9K6WhxJZlsZFWEbqg&s"
              w="35px"
              h="35px"
              objectFit="cover"
              borderRadius={5}
            />
            <Text>Photo-jajajaja.png</Text>
            <Icon as={BsDownload} />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" px={2}>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2-U2-ChuTauggkwXu9K6WhxJZlsZFWEbqg&s"
              w="35px"
              h="35px"
              objectFit="cover"
              borderRadius={5}
            />
            <Text>Photo-jajajaja.png</Text>
            <Icon as={BsDownload} />
          </Flex>
        </Box>
      )}
      <Box px={2}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          fontWeight={600}
        >
          <Text>Shared Files</Text>
          <Icon as={SlArrowDown} fontSize="14px" />
        </Flex>
      </Box>
      <Button
        mt="auto"
        mb={2}
        mx="auto"
        width="70%"
        color="common.100"
        bgColor="red.600"
        _hover={{ bgColor: "red.700" }}
      >
        Block User
      </Button>
      <Button
        mb={2}
        mx="auto"
        width="70%"
        color="common.100"
        bgColor="red.300"
        _hover={{ bgColor: "red.400" }}
        onClick={()=> auth.signOut()}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default Details;
