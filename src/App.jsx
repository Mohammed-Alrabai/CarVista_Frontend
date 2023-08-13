import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Rental from "./pages/Rental";
import CustomerProvider from "./contexts/CustomerContext";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState({});
  const cookies = new Cookies();
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    const asyncToken = async () => {
      try {
        const token = await cookies.get("token");
        if (token) {
          const decodeToken = jwt(token);
          setData(decodeToken.customerData);
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error fetching or decoding token:", error);
      }
    };
    asyncToken();
  }, [location]);

  const signOut = () => {
    cookies.remove("token");
    setIsLogin(false);
    navigator("/login");
  };
  return (
    <>
      <CustomerProvider>
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          ""
        ) : (
          <Navbar customerData={data} isLogin={isLogin} signOut={signOut} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental/:id" element={<Rental />} />
          <Route path="/rentalDetails/:id" element={<Rental />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transaction/:id" element={<Transaction />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          ""
        ) : (
          <Footer />
        )}
      </CustomerProvider>
    </>
  );
}

export default App;
