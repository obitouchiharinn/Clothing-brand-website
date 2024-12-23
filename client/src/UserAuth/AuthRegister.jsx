import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password,
        phone,
      });

      if (response.data.message === "User registered successfully") {
        alert("Registration Successful!");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error registering user");
    }
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter Name",
      value: name,
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter Email",
      value: email,
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Choose a Password",
      value: password,
      required: true,
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "Enter Phone Number",
      value: phone,
      required: false,
    },
  ];

  const handleInputChange = (name, value) => {
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "phone") setPhone(value);
  };

  return (
    <Form
      inputs={inputs}
      buttonText="Signup"
      onSubmit={handleRegister}
      onInputChange={handleInputChange}
      errorMessage={error}
      footerText="Already a member?"
      footerAction={() => navigate("/login")}
    />
  );
};

export default Register;
