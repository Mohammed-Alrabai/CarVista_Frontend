import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useColorModeValue,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import async from "./../Reducers/CustomerReducer";

function Model({ isOpen, onOpen, onClose, data, handelEdit }) {
  const [changeData, setChangeData] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);

  useEffect(() => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setPhone(data.phone);
    setPassword(data.password);
  }, [isOpen]);
  const handelModelEdit = async () => {
    await setChangeData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
    });
      if (changeData) {
        handelEdit(changeData);
      }
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              display={"flex"}
              gap={3}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </Box>
            <FormControl mt={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Change password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone number</FormLabel>
              <Input
                placeholder="Phone"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handelModelEdit()} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Model;
