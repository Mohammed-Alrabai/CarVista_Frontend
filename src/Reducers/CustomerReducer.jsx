import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default async function Customer(state, action) {
  switch (action.type) {
    case "ADD_RENTAL": {
      const { id, name, email, PickDate, DropDate , navigate } = action.payload;
      const api_url = `http://localhost:8000/api/v1/customer/rentalCar/${id}`;
      const payment = true;
      axios
        .post(api_url, {
          rentalDate: PickDate,
          returnDate: DropDate,
          payment: payment,
        })
        .then((res) => {
          const navigate = useNavigate();
          if (res.status === 200) {
            navigate(`/test/${id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    default:
      return state;
  }
}
