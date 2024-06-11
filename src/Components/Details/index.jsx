import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import ImageList from "../Chat/ImageList";

const Details = () => {
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [chat, setChat] = useState();

  const { chatId, user, changeBlock, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(user);

  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(chat?.messages);

  return (
    <Flex flex={1} flexDir="column">
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <Avatar src={user?.avatar || ""} />
        <Heading size="md">{user?.username}</Heading>
        <Text>{user?.email}</Text>
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
      {isPhotosOpen && <ImageList />}

      <Button
        mt="auto"
        mb={2}
        mx="auto"
        width="70%"
        color="common.100"
        bgColor="red.600"
        _hover={{ bgColor: "red.700" }}
        onClick={handleBlock}
      >
        {isCurrentUserBlocked
          ? "You are Blocked!"
          : isReceiverBlocked
          ? "User blocked"
          : "Block User"}
      </Button>
    </Flex>
  );
};

export default Details;
