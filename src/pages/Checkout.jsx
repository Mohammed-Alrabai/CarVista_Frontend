import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link, useToast } from "@chakra-ui/react";
function Checkout() {
  const toast = useToast();
  const [data, setData] = useState({});
  const [carData, setCarData] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const api_url = `https://carvist.onrender.com/api/v1/customer/rentalCar/${id}`;
    const fetchData = async () => {
      const res = await axios.get(api_url);
      const carRes = await axios.get(
        `https://carvist.onrender.com/api/v1/admin/car/${res.data.data.Car}`
      );
      setData(res.data.data);
      setCarData(carRes.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Rental Details</p>
          <p className="text-gray-400">
            Complete your order by providing your rental details.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={carData.carImage}
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{carData.carName}</span>
                <span className="float-right text-gray-400">
                  {carData.carModel}
                </span>
                <p className="text-lg font-bold">
                  ${carData.rentalPrice} / days {data.days}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium">
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                required={true}
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium">
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  required
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                id="credit-expiry"
                name="credit-expiry"
                required
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                required
                maxLength={3}
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${carData.rentalPrice * data.days}
              </p>
            </div>
          </div>
          <Link href={`/transaction/${id}`}>
            <button
              onClick={() =>
                toast({
                  title: "Payment Success",
                  status: "success",
                  isClosable: true,
                  duration: 2000,
                })
              }
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Checkout;
