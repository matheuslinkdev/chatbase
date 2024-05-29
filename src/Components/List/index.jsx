import { Flex } from "@chakra-ui/react"
import UserInfo from "./UserInfo"
import ChatList from "./ChatList"

const List = () => {
  return (
    <Flex flex={1} flexDir="column">
      <UserInfo/>
      <ChatList/>
    </Flex>
  )
}

export default List