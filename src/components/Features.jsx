import {
  Container,
  Box,
  chakra,
  Text,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import {
  MdOutlinePersonPin,
  MdPermDeviceInformation,
  MdOutlineFlashlightOn,
} from "react-icons/md";
import { SiMinds  } from "react-icons/si";
import {FaCarSide } from "react-icons/fa";

const features = [
  {
    heading: "Wide Selection of Premium Cars",
    content:
      "Choose from a diverse range of premium cars that cater to all your preferences.",
    icon: FaCarSide,
  },
 {
  heading: "Seamless Booking Journey",
  content:
    "Embark on a booking adventure like never before. Our intuitive online system ensures a journey as smooth as the open road.",
  icon: SiMinds,
},
  {
    heading: "Effortless Booking Process",
    content:
      "Experience a hassle-free booking process with just a single click.",
    icon: MdPermDeviceInformation,
  },
  {
    heading: "24/7 Customer Service",
    content:
      "Our dedicated customer service team is available around the clock to assist and address your inquiries.",
    icon: MdOutlinePersonPin,
  },
];

const Features = () => {
  return (
    <Container id="features" maxW="6xl" p={{ base: 5, md: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={3} textAlign="center">
        Features
      </chakra.h3>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        placeItems="center"
        spacing={16}
        mt={12}
        mb={4}>
        {features.map((feature, index) => (
          <Box key={index} textAlign="center">
            <Icon as={feature.icon} w={10} h={10} color="orange.400" />
            <chakra.h3 fontWeight="semibold" fontSize="2xl">
              {feature.heading}
            </chakra.h3>
            <Text fontSize="md">{feature.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
