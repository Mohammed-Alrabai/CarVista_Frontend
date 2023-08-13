import React from "react";
import Navbar from "../components/Navbar";

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Input,
  useToast
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

function Rental() {
  const toast = useToast();
  const [data, setData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [PickDate , setPickDate] = useState("");
  const [DropDate , setDropDate] = useState("");


  const navigate = useNavigate();
  const cookies = new Cookies();

  const { id } = useParams();
  useEffect(() => {
    const api_url = `http://localhost:8000/api/v1/admin/car/${id}`;
    axios
      .get(api_url)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      const token = cookies.get("token");
      if (token) {
        const decodeToken = jwt(token);
        setCustomerData(decodeToken.customerData);
        setName(
          decodeToken.customerData.firstName +
            " " +
            decodeToken.customerData.lastName
        );
        setEmail(decodeToken.customerData.email);
      }
  }, []);

  const handelSendRental = (id) => {
    const token = cookies.get("token");
    if (token === undefined) {
      return toast({
        title: "Please login first",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    if (PickDate === "" || DropDate === "") {
      return(
        toast({
          title: "Please fill all the fields",
          status: "error",
          duration: 2000,
          isClosable: true,
        })
      )
    } else {
      const api_url = `http://localhost:8000/api/v1/customer/rentalCar/${id}`;
      const payment = true;
      axios
        .post(api_url, {
          customerId: customerData._id,
          rentalDate: PickDate,
          returnDate: DropDate,
          payment: payment,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate(`/checkout/${res.data.data._id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });  
    }
  }
  console.log(name);
  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={data.carImage}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
                {data.carName}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}>
                {data.rentalPrice} $ / Day
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("orange.400", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                  textAlign={"center"}>
                  Car Details
                </Text>

                <SimpleGrid
                  maxW={{ base: "100%", md: "50%", lg: "30%" }}
                  columns={{ base: 2, md: 2 }}
                  spacing={0}>
                  <List spacing={2}>
                    <ListItem>Car Name </ListItem>
                    <ListItem>Car Model</ListItem> <ListItem>Car Type</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>{data.carName}</ListItem>
                    <ListItem>{data.carModel}</ListItem>
                    <ListItem>{data.carType}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                  textAlign={"center"}>
                  Rental Form
                </Text>

                <Box>
                  <Box p={2}>
                    <label htmlFor="name">Name</label>
                    <Input
                      my={2}
                      type="text"
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <Input
                      my={2}
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Pick">Pick up date</label>
                    <Input
                      my={2}
                      type="date"
                      id="Pick"
                      placeholder="Pick up date"
                      required
                      value={PickDate}
                      onChange={(e) => setPickDate(e.target.value)}
                    />
                    <label htmlFor="Return">Return date</label>
                    <Input
                      my={2}
                      type="date"
                      id="Return"
                      placeholder="Return date"
                      required
                      value={DropDate}
                      onChange={(e) => setDropDate(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={() => {
                handelSendRental(data._id);
              }}>
              Book Now
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Rental;
