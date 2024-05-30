import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
  };

  return (
    <Flex>
      <Box>
        <form onSubmit={handleLogin}>
          <FormLabel>Your Email:</FormLabel>
          <Input type="email" />
          <FormLabel>Your Password:</FormLabel>
          <Input type="password" />
          <Button>Sign In</Button>
        </form>
      </Box>
      <Spacer />
      <Box>
        <form>
          <Avatar src={avatar.url ? avatar.url : ""} />
          <FormLabel>Choose a Photo:</FormLabel>
          <Input type="file" onChange={handleAvatar} />
          <FormLabel>Enter a UserName:</FormLabel>
          <Input type="text" />
          <FormLabel>Enter a Email:</FormLabel>
          <Input type="email" />
          <FormLabel>Enter a Password:</FormLabel>
          <Input type="password" />
          <Button>Sign Up</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
