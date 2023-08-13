import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  LinearGradient,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: "#e74c3c",
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: "#3498db",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  detailContainer: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function PDFFile({ data, carData, customerData, rentalData , carPrice }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.heading}>Thank you for your purchase</Text>

        <Text style={styles.sectionHeading}>Transaction Details:</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.text}>
            Transaction Number: {data.transactionNumber}
          </Text>
          <Text style={styles.text}>Transaction Date: {data.date}</Text>
        </View>

        <Text style={styles.sectionHeading}>Car Details:</Text>
        {carData.map((car, index) => (
          <View style={styles.detailContainer} key={index}>
            <Text style={styles.text}>Car Name: {car.carName}</Text>
            <Text style={styles.text}>Car Model: {car.carModel}</Text>
            <Text style={styles.text}>
              Car Price: {car.rentalPrice} $ / day
            </Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>Customer Details:</Text>
        {customerData.map((customer, index) => (
          <View style={styles.detailContainer} key={index}>
            <Text style={styles.text}>
              Customer Name: {customer.firstName} {customer.lastName}
            </Text>
            <Text style={styles.text}>Customer Email: {customer.email}</Text>
            <Text style={styles.text}>Customer Phone: {customer.phone}</Text>
          </View>
        ))}
        {rentalData.map((rental, index) => (
          <View style={styles.detailContainer} key={index}>
            <Text style={styles.sectionHeading}>Payment Details:</Text>
            <Text style={styles.text}>
              Payment total: {parseInt(carPrice) * parseInt(rental.days)}$
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default PDFFile;
