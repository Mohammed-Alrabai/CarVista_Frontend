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


function Signup() {
    const toast = useToast();
      const [data, setData] = useState({});
      const [error, setError] = useState(false);
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [phone, setPhone] = useState("");

      const navigate = useNavigate();

      const cookies = new Cookies();
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
      const isValidPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;

      const handleSubmit = (e) => {
            if (email === "" || password === "" || firstName === "" || lastName === "" || phone === "") {
              return toast({
                title: "Please fill all the fields",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }

            // email validation
            if (email.match(isValidEmail) === null) {
              return toast({
                title: "Email is not valid",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
            if (password.match(isValidPassword) === null) {
              return toast({
                title: "Please enter a valid password ",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
            if (phone.match(isValidPhone) === null) {
              return toast({
                title: "Please enter a valid phone number",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
              
            }
        const api_url = `http://localhost:8000/api/v1/customer/createCustomer`;
        axios
          .post(api_url, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
          })
          .then((res) => {
            if (res.status === 200) {
              navigate("/");
              setData(res.data.data);
              cookies.set("token", res.data.token, { path: "/" });
            }
          })
          .catch((err) => {
            if (err === undefined) {
              return <></>;
            }
            if (err.response.status === 401 || err.response.status === 404) {
              return toast({
                title: "Oops! Something went wrong please try again",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
          });
      };
  return (
    <Stack minH="100vh" w={"full"} mx={"auto"} direction={{ base: "column-reverse", md: "row" }}>
      <Flex flex={1} display={{ base: "none", md: "flex" }}>
        <Image
          alt="Cover image"
          objectFit="cover"
          src={Cars}
          maxH={"100vh"}
          w={"100%"}
        />
      </Flex>
      <Flex p={8} w={"full"} flex={1} align="center" mx={"auto"} justifyContent="center">
        <Stack spacing={4} mx={"auto"}>
          <Stack align="center" justifyContent={"center"}>
            <Heading fontSize="2xl">Signup a new account</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={8}
            mx={"auto"}
            boxSize={{ base: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}>
            <VStack spacing={4} w="100%">
                <VStack spacing={2}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", md: "row" }}
                w="100%"
                >
              <FormControl id="firstName" w={{base:"100%" , md:"50%"}}>
                <FormLabel>First Name</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl id="lastName" w={{base:"100%" , md:"50%"}}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  rounded="md"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
              </VStack>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  rounded="md"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone</FormLabel>
                <Input
                  rounded="md"
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
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
                  You Have an account?
                  <Link
                    href="/login"
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
                    Login
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
                Signup
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Signup;
