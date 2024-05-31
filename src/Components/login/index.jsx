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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

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

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex>
      <Box>
        <form onSubmit={handleLogin}>
          <FormLabel>Your Email:</FormLabel>
          <Input type="email" name="email" />
          <FormLabel>Your Password:</FormLabel>
          <Input type="password" name="password" />
          <Button type="submit">Sign In</Button>
        </form>
      </Box>

      <Spacer />

      <Box>
        <form onSubmit={handleRegister}>
          <Avatar src={avatar.url ? avatar.url : ""} />
          <FormLabel>Choose a Photo:</FormLabel>
          <Input type="file" onChange={handleAvatar} />
          <FormLabel>Enter a UserName:</FormLabel>
          <Input type="text" name="username" />
          <FormLabel>Enter an Email:</FormLabel>
          <Input type="email" name="email" />
          <FormLabel>Enter a Password:</FormLabel>
          <Input type="password" name="password" />
          <Button type="submit">Sign Up</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
