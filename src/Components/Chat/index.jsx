import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaPhoneAlt, FaInfoCircle } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoMdSend } from "react-icons/io";
import { FaImage, FaCamera, FaMicrophone } from "react-icons/fa6";

import EmojiPicker, { Emoji } from "emoji-picker-react";
import { useState } from "react";

const Chat = () => {
  const [openPicker, setEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  return (
    <Flex
      flex={2}
      borderLeft="1px solid #fff"
      borderRight="1px solid #fff"
      flexDir="column"
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
      <Box alignItems="center">
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

            {openPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
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
