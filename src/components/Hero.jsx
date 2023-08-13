import * as React from "react";
import {
  Box,
  Link,
  Heading,
  Flex,
  Text,
  Button,
  Image,
  Container,
  chakra,
} from "@chakra-ui/react";
import bgHero from "../assets/img/Hero/Bg-hero.svg";
import vectorHero from "../assets/img/Hero/bg-vector.svg";
import underline from "../assets/img/Hero/Underline.svg";
import doodle from "../assets/img/Hero/Doodle-l.svg";
import Navbar from "./Navbar";


function Hero() {
  return (
    <Box
      w={"full"}
      backgroundColor={"#F9F9F9"}
      h={"calc(100vh)"}
      position="relative"
      maxW="full"
      bgImage={bgHero}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover">
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        position={"relative"}
        w={"full"}
        h={"calc(100vh - 100px)"}>
        <Box>
          <Box maxW={"500px"} textAlign={{ base: "center", md: "left" }}>
            <Text mb="0.5rem" fontSize={"4xl"} fontWeight={"bold"}>
              Unleash the Road <br /> Adventure with{" "}
              <chakra.span
                textStyle={"carVista"}
                position={"relative"}
                color={"#F28E09"}
                fontWeight={"bold"}
                fontSize={"4xl"}
                _after={{
                  content: "''",
                  backgroundImage: `url(${underline})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  position: "absolute",
                  right: "0",
                  top: "44px",
                  height: "100%",
                  width: "100%",
                }}>
                {" "}
                CarVista
              </chakra.span>
            </Text>
            <Text px={{ base: 4, md: 0 }} fontSize={"sm"} color={"gray.500"}>
              Discover the thrill of the open road and explore breathtaking
              destinations with our top-tier car rental services. At CarVista,
              we transform your travel dreams into unforgettable journeys.
              Whether it's a weekend getaway or a cross-country expedition,
              CarVista is your trusted companion for a seamless and exciting
              road trip.
            </Text>
            <Button
              bg={"#F28E09"}
              color={"white"}
              _hover={{ bg: "#D88516" }}
              size={"lg"}
              mt="2rem">
              Book Now
            </Button>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <Image
                width={"800px"}
                height={"100%"}
                src={vectorHero}
                alt="bgHero"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
