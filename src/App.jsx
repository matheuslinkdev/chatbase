import { Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import List from './Components/List'
import Chat from './Components/Chat'
import Details from './Components/Details'

function App() {
  return(
    <Flex bgColor="blue.800" w="90dvw" height="90dvh" border="2px solid var(--chakra-colors-blue-900)" borderRadius={10}>
      <List/>
      <Chat/>
      <Details/>
    </Flex>
  )
}

export default App
