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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/uploads";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    console.log(username);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      alert("Account Created!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
          <Button type="submit" disabled={loading}>
            {loading ? "Loading" : "Sign In"}
          </Button>
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
          <Button type="submit" disabled={loading}>
            {loading ? "Loading" : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
