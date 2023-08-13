import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Line,
  LinearGradient,
} from "@react-pdf/renderer";
import PDFFile from "../components/PDFFile";
import { Box , Button, Icon, Image, Link } from "@chakra-ui/react";
import SuccessGif from "../assets/img/successGif.gif";
import Success from "../assets/animation_ll98lho1.json";
import {AiFillCheckCircle} from "react-icons/ai";


function Transaction() {
  const [data, setData] = useState({});
  const [carData, setCarData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [rentalData, setRentalData] = useState([]);
  const [carPrice , setCarPrice] = useState(0);

  const cookies = new Cookies();
  const { id } = useParams();
  useEffect(() => {
    const api_url = `http://localhost:8000/api/v1/customer/transaction/${id}`;
    axios
      .get(api_url, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res) => {
        setData({ ...res.data.data , date: res.data.data.date.split("T")[0] });
        setCarData(res.data.data.Cars);
        setCarPrice(res.data.data.Cars[0].rentalPrice);
        setCustomerData(res.data.data.Customer);
        setRentalData(res.data.data.Rental);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 200px)",
          flexDirection: "column",
        }}>
        <Box>
          <Icon as={AiFillCheckCircle} color="green" w={"200px"} h={"200px"} />
        </Box>
        <Text
          style={{
            marginBottom: "20px",
            fontSize: "24px",
          }}>
          Thank you for your reservation
        </Text>
        <Text
          style={{
            marginBottom: "20px",
            fontSize: "24px",
          }}>
          You can download your transaction details
        </Text>
        <Box display={"flex"} w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
          <PDFDownloadLink
            style={{
              textDecoration: "none",
              padding: "10px",
              backgroundColor: "#F28E09",
              color: "white",
              borderRadius: "5px",
            }}
            document={
              <PDFFile
                data={data}
                carData={carData}
                carPrice={carPrice}
                customerData={customerData}
                rentalData={rentalData}
              />
            }
            fileName="transaction.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Transaction"
            }
          </PDFDownloadLink>
          <Link href="/">
            <Button
              style={{
                backgroundColor: "#F28E09",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}>
              Go Back
            </Button>
          </Link>
        </Box>
      </View>
    </>
  );
}

export default Transaction;
