import * as React from "react";
import { Container, Text, SimpleGrid, Box, Center } from "@chakra-ui/react";

const statData = [
  {
    id: 1,
    label: "Satisfied Customers",
    score: "850",
  },
  {
    id: 2,
    label: "Cars in Fleet",
    score: "256",
  },
  {
    id: 3,
    label: "Kilometers Driven",
    score: "12,576",
  },
  {
    id: 4,
    label: "Dedicated Team Members",
    score: "20",
  },
];

const BrandStats = () => {
  return (
    <Container bg={"#F9F9F9"} maxW="full" p={{ base: 5, md: 10 }}>
      <Center>
        <Box textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
            <Box as="span" display="inline-block" position="relative">
              Your Trusted Car Rental Solution
              <Box
                as="span"
                display="block"
                position="absolute"
                bg={"orange.400"}
                w={"100%"}
                h={"1px"}
              />
            </Box>
          </Text>
          <Text maxW={"2xl"} fontSize="lg" mb={4} color={"gray.500"}>
            Experience a new level of convenience and style with CarVista's
            premium car rental services. Whether you're embarking on a journey
            or exploring the city, we're here to make your ride exceptional.
          </Text>
        </Box>
      </Center>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={{ base: 2, sm: 5 }}
        mt={12}
        mb={4}>
        {statData.map((data) => (
          <Box key={data.id} p={{ base: 2, sm: 5 }} textAlign="center">
            <Text fontWeight="extrabold" fontSize="xx-large">
              {data.score}
            </Text>
            <Text fontSize="sm">{data.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BrandStats;
