import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AddUser from "./AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { changeChat, resetChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
      

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <Flex flexDir="column" flex={1} overflowY="auto" p={2}>
      <Flex alignItems="center" gap="15px">
        <Flex alignItems="center" flex={1}>
          <Icon as={IoMdSearch} />
          <Input
            placeholder="Search"
            bgColor="blue.400"
            border="none"
            onChange={(e) => setInput(e.target.value)}
          />
        </Flex>
        <Icon
          as={addMode ? FaMinus : FaPlus}
          onClick={() => setAddMode(!addMode)}
        />
      </Flex>

      {filteredChats.map((chat) => (
        <Flex
          p="15px"
          key={chat.chatId}
          alignItems="center"
          bgColor={chat.isSeen ? "transparent" : "#5183fe"}
          borderRadius="15px"
          my={1}
          _hover={{ bgColor: "#063746ee", cursor: "pointer" }}
          transition=".3s ease"
          onClick={() => handleSelect(chat)}
        >
          <Avatar src={chat.user.avatar || ""} />
          <Flex flexDir="column" ml={2}>
            <Heading size="md" fontWeight={400}>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </Heading>
            <Text>{chat.lastMessage}</Text>
          </Flex>
        </Flex>
      ))}

      {addMode && <AddUser />}
      <Button
        mb={2}
        mx="auto"
        width="70%"
        color="common.100"
        bgColor="red.300"
        _hover={{ bgColor: "red.400" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default ChatList;
