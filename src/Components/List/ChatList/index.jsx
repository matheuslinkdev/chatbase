import { Avatar, Flex, Heading, Icon, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AddUser from "./AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

 useEffect(() => {
   const unSub = onSnapshot(
     doc(db, "userchats", currentUser.id),
     async (res) => {
       const items = res.data().chats;
       console.log(res.data())

       const promises = items.map(async (item) => {
         const userDocRef = doc(db, "users", item.receiverId);
         const userDocSnap = await getDoc(userDocRef);

         const user = userDocSnap.data();
         
         return { ...item, user };
        });
        
       const chatData = await Promise.all(promises);
       console.log(chatData)

       setChats(chatData);
     }
   );


   return () => {
     unSub();
   };
 }, [currentUser.id]);

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

      {chats.map((chat) => (
        <Flex p="15px" key={chat.chatId}>
          <Avatar src={chat.user.avatar || ""}/>
          <Flex flexDir="column" ml={2}>
            <Heading size="md">{chat.user.username}</Heading>
            <Text>{chat.lastMessage}</Text>
          </Flex>
        </Flex>
      ))}

      {addMode && <AddUser />}
    </Flex>
  );
};

export default ChatList;
