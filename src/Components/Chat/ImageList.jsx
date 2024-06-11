import { Flex, Image, Text} from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { useChatStore } from '../../lib/chatStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const ImageList = () => {

     const [chat, setChat] = useState();

     const { chatId } =
       useChatStore();

     useEffect(() => {
       const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
         setChat(res.data());
       });

       return () => {
         unSub();
       };
     }, [chatId]);

     console.log(chat?.messages);

      const images =
        chat?.messages?.reduce((acc, msg) => {
          if (msg.img) {
            acc.push(msg.img);
          }
          return acc;
        }, []) || []; // Inicializa como array vazio se chat.messages for undefined

      console.log(images); 

    
  return (
    <Flex justifyContent="space-between" alignItems="center" px={2} maxW="95%" flexWrap="wrap" gap="10px">
      {images.length > 0 ? images.map((img, index)=>{
        return(
            <Image
              src={img}
              key={index}
              w="45px"
              h="45px"
              objectFit="cover"
              borderRadius={5}
              />

        )
      }) : <Text>No photos shared</Text>}
    </Flex>
  );
}

export default ImageList