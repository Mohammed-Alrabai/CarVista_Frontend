import * as React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  Link,
  Image,
  Flex,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import Cars from "../assets/img/Cars.jpg";

function Login() {
  const toast = useToast();
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const cookies = new Cookies();
  const handleSubmit = (e) => {
    if (email === "" || password === "") {
      return toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    const api_url = `http://localhost:8000/api/v1/customer/loginCustomer`;
    axios
      .post(api_url, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          toast({ title: "Success", status: "success", duration: 2000 });
          cookies.set("token", res.data.token, { path: "/" });
          setData(res.data.data);
          navigate("/");
        }
      }).catch((err)=>{
        if (err === undefined) {
          return <></> 
        }
        if (err.response.status === 401 || err.response.status === 404) {
          return toast({
            title: err.response.data.massage,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      })
  };

  return (
    <Stack minH="100vh" direction={{ base: "column-reverse", md: "row" }}>
      <Flex flex={1} display={{ base: "none", md: "flex" }}>
        <Image
          alt="Cover image"
          objectFit="cover"
          src={Cars}
          maxH={"100vh"}
          w={"100%"}
        />
      </Flex>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Login to your account</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={8}
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}>
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  rounded="md"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  rounded="md"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                w="100%">
                <Checkbox colorScheme="orange" size="md">
                  Remember me
                </Checkbox>
                <Text fontSize={{ base: "md", sm: "md" }}>
                  Not Have an account?
                  <Link
                    href="/signup"
                    fontSize={{ base: "md", sm: "md" }}
                    ml={2}
                    position={"relative"}
                    _hover={{
                      textDecoration: "none",
                      color: "orange.300",
                      _after: {
                        content: '""',
                        width: "100%",
                        height: "1px",
                        backgroundColor: "orange.300",
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                      },
                    }}>
                    Register
                  </Link>
                </Text>
              </Stack>
              <Button
                bg="orange.300"
                color="white"
                _hover={{
                  bg: "orange.400",
                }}
                rounded="md"
                w="100%"
                onClick={handleSubmit}>
                Login
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Login;
