import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const [logMessage, setLogMessage] = useState("");

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    console.log("Searching for username:", username);

    try {
      const userRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("User found:", userData);
        setUser(userData);
      } else {
        console.log("No user found with the given username");
        setUser(null);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

       await updateDoc(doc(userChatsRef, currentUser.id), {
         chats: arrayUnion({
           chatId: newChatRef.id,
           lastMessage: "",
           receiverId: user.id,
           updatedAt: Date.now(),
         }),
       });

      // Set the log message
      setLogMessage(`User ${user.username} has been added.`);
    } catch (err) {
      console.log(err);
    }
  };

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
      <form onSubmit={handleSearch}>
        <Flex alignItems="center">
          <Input placeholder="Username" name="username" />
          <button type="submit">
            <Icon as={IoIosSearch} ml={2} />
          </button>
        </Flex>
      </form>

      {user && (
        <Flex
          alignItems="center"
          p={2}
          justifyContent="space-between"
          zIndex={999999}
          bgColor="red"
          mt={4}
        >
          <Avatar src={user.avatar || ""} />
          <Heading size="md">{user.username}</Heading>
          <Icon as={FaPlus} onClick={handleAdd} />
        </Flex>
      )}

      {logMessage && (
        <Text mt={4} color="white">
          {logMessage}
        </Text>
      )}
    </Box>
  );
};

export default AddUser;
