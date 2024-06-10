import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import List from "./Components/List";
import Chat from "./Components/Chat";
import Details from "./Components/Details";
import Login from "./Components/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <Flex>Loading ...</Flex>;

  return (
    <Flex
      bgColor="blue.800"
      w="90dvw"
      height="90dvh"
      border="2px solid var(--chakra-colors-blue-900)"
      borderRadius={10}
    >
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Details />}
        </>
      ) : (
        <Login />
      )}
    </Flex>
  );
}

export default App;
