import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/uploads";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

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

    if (!email || !password) {
      setLoginErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    if (!username || !email || !password) {
      setRegisterErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    const registerPromise = new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
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

          resolve("Account Created!");
        } catch (err) {
          console.log(err);
          reject(err.message);
        } finally {
          setLoading(false);
        }
      })();
    });

    toast.promise(registerPromise, {
      pending: "Creating your account...",
      success: "Account created successfully!",
      error: {
        render({ data }) {
          return data; // data will contain the error message
        },
      },
    });

    try {
      await registerPromise;
    } catch (err) {
      setRegisterErrorMessage(err);
    }
  };

  return (
    <Flex justifyContent="space-evenly" alignItems="center" w="100%" p={6}>
      <Box>
        <Heading size="lg" mb={6}>
          Sign Up
        </Heading>
        <form onSubmit={handleRegister}>
          {avatar.url && (
            <Avatar
              src={avatar.url ? avatar.url : ""}
              size="lg"
              bgColor="blue.300"
            />
          )}
          <FormControl isInvalid={!!registerErrorMessage}>
            <FormLabel>Choose a Photo:</FormLabel>
            <Input type="file" onChange={handleAvatar} border="none" ml="-4" />
            <FormLabel>Enter a UserName:</FormLabel>
            <Input type="text" name="username" />
            <FormLabel>Enter an Email:</FormLabel>
            <Input type="email" name="email" />
            <FormLabel>Enter a Password:</FormLabel>
            <Input type="password" name="password" />
            {registerErrorMessage && (
              <FormErrorMessage>{registerErrorMessage}</FormErrorMessage>
            )}
            <Button type="submit" disabled={loading} mt={2}>
              {loading ? "Loading" : "Sign Up"}
            </Button>
          </FormControl>
        </form>
      </Box>
      <ToastContainer />
      <Box>
        <Heading size="lg" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl isInvalid={!!loginErrorMessage}>
            <FormLabel>Your Email:</FormLabel>
            <Input type="email" name="email" />
            <FormLabel>Your Password:</FormLabel>
            <Input type="password" name="password" />
            {loginErrorMessage && (
              <FormErrorMessage>{loginErrorMessage}</FormErrorMessage>
            )}
            <Button type="submit" disabled={loading} mt={2}>
              {loading ? "Loading" : "Sign In"}
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
