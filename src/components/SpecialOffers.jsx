import { Fragment } from "react";
import {
  chakra,
  Box,
  Stack,
  VStack,
  HStack,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  Button,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { AiOutlineHeart, AiOutlineExclamationCircle } from "react-icons/ai";
import { BsTelephoneX } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const productsList = [
  {
    id: 1,
    title: "Ford F-150 SUV 2021",
    location: "Paris",
    detail: ["2021", "Petrol", "4500 cc", "Automatic"],
    updated_at: "17 days ago",
    price: "$ 400k",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  },
  {
    id: 2,
    title: "Haval Jolion Top",
    location: "New York",
    detail: ["2021", "Petrol", "3500 cc", "Automatic"],
    updated_at: "1 days ago",
    price: "$ 450k",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  },
];

function SpecialOffers() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const api_url = `http://localhost:8000/api/v1/admin/carsPagination?page=${pagination}`;
    axios
      .get(api_url)
      .then((res) => {
        setData(res.data.data);
        data.map((product) => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handelNavigate = (id) => {
    navigate(`/rental/${id}`);
  };
  return (
    <Container
      id="Special_Offers"
      maxW="7xl"
      p={{ base: 5, md: 12 }}
      margin="0 auto">
      <Box>
        <Text mb="4" fontSize="4xl" fontWeight="bold" textAlign="center">
          Special Offers
        </Text>
      </Box>
      <VStack spacing={4}>
        {data.map((product) => (
          <Stack
            key={product._id}
            spacing={{ base: 0, md: 4 }}
            direction={{ base: "column", md: "row" }}
            border="1px solid"
            borderColor="gray.400"
            p={2}
            rounded="md"
            w={{ base: "auto", md: "2xl" }}
            overflow="hidden"
            pos="relative">
            <Flex ml="0 !important">
              <Image
                rounded="md"
                w={{ base: "100%", md: "18rem" }}
                h="auto"
                objectFit="cover"
                src={product.carImage}
                alt="product image"
              />
            </Flex>
            <Stack
              direction="column"
              spacing={2}
              w="100%"
              mt={{ base: "5px !important", sm: 0 }}>
              <Flex justify="space-between">
                <chakra.h3
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold">
                  {product.carName}
                </chakra.h3>
                <chakra.h3
                  fontSize={{ base: "md", md: "md" }}
                  fontWeight="bold">
                  {product.rentalPrice}{" "}
                  <chakra.span fontSize="sm"> $/ day </chakra.span>
                </chakra.h3>
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="500">
                  {/* {product.location} */}
                </Text>
              </Box>
              <Flex alignItems="center" color="gray.500">
                <Fragment>
                  <Text fontSize={{ base: "sm", sm: "md" }}>
                    {product.carName} | {product.carModel} | {product.carType} |{" "}
                    {product.carStatus}
                  </Text>
                </Fragment>
              </Flex>
              <Stack
                direction={{ base: "column-reverse", sm: "row" }}
                justify="space-between"
                alignItems={{ base: "flex-start", sm: "center" }}>
                <Text fontSize="sm" mt={{ base: 1, sm: 0 }}>
                  Updated {product.updatedAt.slice(0, 10)}
                </Text>
                <Stack direction="row" spacing={1} mb="0 !important">
                  <Button
                    spacing={2}
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    onClick={() => handelNavigate(product._id)}>
                    <Text fontSize="sm">Rental Now</Text>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ))}
        <Box>
          <Button bg={"orange.400"} color="white" _hover={{ bg: "orange.500" }}>
            Load More
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}

export default SpecialOffers;
