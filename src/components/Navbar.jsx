import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  MenuDivider,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiTwotoneThunderbolt } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "features" },
  { name: "Special Offers", path: "Special_Offers" },
];

import logo from "../../public/logoTwo.svg";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export default function Navbar({ isLogin, signOut, customerData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [scrolling, setScrolling] = useState(false);
  const cookies = new Cookies();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const menuProps = {
    bg: useColorModeValue("gray.200", "gray.700"),
    color: useColorModeValue("blue.500", "blue.200"),
  };

  return (
    <Box
      px={{ base: 4, md: 4 }}
      py={{ base: 2, md: 2 }}
      boxShadow={"md"}
      position={"sticky"}
      top={0}
      zIndex={99}
      bg={scrolling ? "white" : "transparent"}
      width="100%">
      <Flex
        h={16}
        alignItems="center"
        bg={"transparent"}
        w={"100%"}
        flexDir={"row-reverse"}
        justifyContent="space-between"
        maxW={1200}
        mx="auto">
        <IconButton
          ml={4}
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={["inherit", "inherit", "none"]}
          onClick={isOpen ? onClose : onOpen}
        />
        <Box display={["inherit", "inherit", "none"]}>
          {isLogin ? (
            <MenuNavbar customerData={customerData} signOut={signOut} />
          ) : (
            <></>
          )}
        </Box>
        <HStack
          w={"full"}
          spacing={8}
          alignItems="center"
          display={"flex"}
          justifyContent={"space-between"}>
          <Avatar
            href="#"
            as={Link}
            size="sm"
            border={"none"}
            w="70px"
            src={logo}
          />
          <HStack
            as="nav"
            spacing={1}
            display={{ base: "none", md: "flex" }}
            alignItems="center">
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            {isLogin ? (
              <MenuNavbar customerData={customerData} signOut={signOut} />
            ) : (
              <>
                <Link href="/login">
                  <Button
                    size="sm"
                    bg={"#f28e09"}
                    color={"white"}
                    _hover={{
                      bg: "#D88516",
                    }}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    bg={"#f28e09"}
                    color={"white"}
                    _hover={{
                      bg: "#D88516",
                    }}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </HStack>
        </HStack>
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <Box
          pb={4}
          display={["inherit", "inherit", "none"]}
          justifyContent={"space-between"}>
          <Stack as="nav" spacing={2}>
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
            {isLogin ? (
              <></>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    size="sm"
                    bg={"#f28e09"}
                    color={"white"}
                    _hover={{
                      bg: "#D88516",
                    }}>
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    bg={"#f28e09"}
                    color={"white"}
                    _hover={{
                      bg: "#D88516",
                    }}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

const NavLink = ({ name, path, onClose }) => {
  const link = {
    bg: useColorModeValue("gray.100", "gray.700"),
    color: useColorModeValue("orange.500", "blue.200"),
  };

  return (
    <ScrollLink
      to={path}
      smooth={true}
      duration={500}
      spy={true}
      exact="true"
      offset={-70}
      activeClass="active"
      onClick={onClose}>
      <Link
        px={3}
        py={"6px"}
        lineHeight="inherit"
        rounded="md"
        _hover={{
          textDecoration: "none",
          bg: link.bg,
          color: link.color,
        }}
        onClick={() => onClose()}>
        {name}
      </Link>
    </ScrollLink>
  );
};
const MenuNavbar = ({ signOut, customerData }) => {
  const cookies = new Cookies();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}>
        <Avatar
          size={"sm"}
          src={""}
          bg={useColorModeValue("orange.300", "blue.900")}
        />
      </MenuButton>
      <MenuList>
        <Text p={2}>Hi {customerData.firstName}</Text>
        <MenuDivider />
        <Link href={`/profile/${customerData._id}`}>
          <MenuItem>Profile</MenuItem>
        </Link>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};
