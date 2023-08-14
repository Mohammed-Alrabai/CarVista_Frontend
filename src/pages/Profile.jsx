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
  Container,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Model from "../components/Model";
import Cookies from "universal-cookie";
import sweetAlert from "sweetalert2";
function Profile() {
  const toast = useToast();
  const [data, setData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const initialRef = React.useRef(null);

  const finalRef = React.useRef(null);
  const navigator = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://carvist.onrender.com/api/v1/customer/customer/${id}`
      );
      setData({
        ...res.data.data,
        date: res.data.data.createdAt.split("T")[0],
        update: res.data.data.updatedAt.split("T")[0],
      });
    };
    fetchData();
  }, []);

  const handelModelOpen = () => {
    onOpen();
  };

  const handelEdit = async () => {
    const url = `https://carvist.onrender.com/api/v1/customer/updateCustomer/${id}`;
    try {
      const res = await axios.put(
        url,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      );
      setData(res.data.data);
      if (res.status === 200) {
        toast({ title: "Updated successfully", status: "success", duration: 2000 });
        onClose()
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404 || error.response.status === 500) {
        toast({
          title: "Oops! Something went wrong please try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        
      }
    }
  };
  const handelDelModelOpen = () => {
    setIsDelOpen(true);
  };

  const handelDelete = async () => {
    const { _id } = data;
    const url = `https://carvist.onrender.com/api/v1/customer/deleteCustomer/${_id}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      });
      setData(res.data.data);
      if (res.status === 200) {
        cookies.remove("token");
        navigator("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAlert = () => {
    sweetAlert
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          handelDelete();
        }
      });
  };

  return (
    <>
      <Container maxW="3xl" p={{ base: 5, md: 12 }} margin="0 auto">
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This is some information about the user.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.firstName} {data.lastName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.phone}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Create date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.date}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Update date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.update}
                </dd>
              </div>
              <Box
                gap={3}
                p={{ base: 5, md: 10 }}
                w={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    handelModelOpen(id);
                  }}>
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    deleteAlert();
                  }}>
                  Delete
                </Button>
              </Box>
            </dl>
          </div>
        </div>
      </Container>
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
            <Button onClick={() => handelEdit()} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
