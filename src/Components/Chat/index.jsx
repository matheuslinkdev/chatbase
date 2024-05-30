import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaPhoneAlt, FaInfoCircle } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { FaImage, FaCamera, FaMicrophone } from "react-icons/fa6";

import EmojiPicker, { Emoji } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [openPicker, setEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null)

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: "smooth"})
  }, [])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  return (
    <Flex
      flex={2}
      borderLeft="1px solid #fff"
      borderRight="1px solid #fff"
      flexDir="column"
      position="relative"
      overflowY="auto"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Flex alignItems="center">
          <Avatar />
          <Flex justifyContent="space-between" flexDir="column" p={2}>
            <Heading size="md">Jane Doe</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </Text>
          </Flex>
        </Flex>
        <Flex gap="10px">
          <Icon as={FaPhoneAlt} />
          <Icon as={BsFillCameraVideoFill} />
          <Icon as={FaInfoCircle} />
        </Flex>
      </Box>

      <Box flex={1} px={2} maxW="70%" alignSelf="flex-end">
        <Text
          color="common.100"
          bgColor="picton-blue.950"
          borderRadius={4}
          p={1}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
        </Text>
        <Text>10:16</Text>
      </Box>

      <Box flex={1} px={2} maxW="70%">
        <Avatar mb={1} />

        <Text color="common.50" bgColor="cyan.950" borderRadius={4} p={1}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          architecto ducimus blanditiis dignissimos ab. Corrupti, impedit
          veritatis, nulla blanditiis a culpa cupiditate sequi saepe obcaecati
          quo ea illum ipsa reprehenderit!.{" "}
        </Text>
        <Text>10:17</Text>
      </Box>

      <Box flex={1} px={2} maxW="70%" alignSelf="flex-end">
        <Text
          color="common.100"
          bgColor="picton-blue.950"
          borderRadius={4}
          p={1}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
        </Text>
        <Text>10:16</Text>
      </Box>

      <Box flex={1} px={2} maxW="70%">
        <Avatar mb={1} />

        <Text color="common.50" bgColor="cyan.950" borderRadius={4} p={1}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          architecto ducimus blanditiis dignissimos ab. Corrupti, impedit
          veritatis, nulla blanditiis a culpa cupiditate sequi saepe obcaecati
          quo ea illum ipsa reprehenderit!.{" "}
        </Text>
        <Text>10:17</Text>
      </Box>

      <Box flex={1} px={2} maxW="70%" alignSelf="flex-end">
        <Image src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" h="auto" w="100%" objectFit="cover" borderRadius={5} mb={1}/>
        <Text
          color="common.100"
          bgColor="picton-blue.950"
          borderRadius={4}
          p={1}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
        </Text>
        <Text>10:16</Text>
      </Box>

      <Box ref={endRef}>

      </Box>

      <Box alignItems="center" mt="auto" px={10} py={2}>
        <Flex alignItems="center">
          <Flex gap={2} p={1}>
            <Icon as={FaImage} />
            <Icon as={FaCamera} />
            <Icon as={FaMicrophone} />
          </Flex>
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Flex ml={1}>
            <Icon
              as={RiEmojiStickerLine}
              onClick={() => setEmojiPicker(!openPicker)}
            />
            <Box position="relative">
              {openPicker && (
                <EmojiPicker
                  onEmojiClick={handleEmoji}
                  style={{ position: "absolute", bottom: "50px", left: 0 }}
                />
              )}
            </Box>
          </Flex>
          <Button bg="none" _hover={{ bg: "none" }}>
            <Icon as={IoMdSend} />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Chat;
