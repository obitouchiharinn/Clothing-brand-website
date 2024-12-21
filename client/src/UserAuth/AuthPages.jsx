import React, { useState,useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// Login Page
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const { login } = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
  
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
  
      if (response.data.message === "Login successful") {
        alert("Login Successful!");
        localStorage.setItem("userId", response.data.userId);
        console.log(response.data.userId) // Store userId for future requests
        login(); // Auth context login method
        navigate("/home"); // Redirect to homepage/dashboard
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error logging in");
    }
  };

  return (
    <StyledWrapper>
      <div className="login">
        <div className="header">
          <span>Welcome Back!</span>
          <p>Login to your account.</p>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
          <span>
            Not a member?{" "}
            <a
              href="#"
              onClick={() => navigate("/register")}
            >
              Register Here
            </a>
          </span>
        </form>
      </div>
    </StyledWrapper>
  );
};

// Register Page
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
        navigate("/login"); // Redirect to login page after registration
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error registering user");
    }
  };

  return (
    <StyledWrapper>
      <div className="login">
        <div className="header">
          <span>Join us today!</span>
          <p>Sign up now to become a member.</p>
        </div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Choose A Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Signup</button>
          <span>
            Already a member?{" "}
            <a
              href="#"
              onClick={() => navigate("/login")}
            >
              Login Here
            </a>
          </span>
        </form>
      </div>
    </StyledWrapper>
  );
};

// Shared Styled Component
const StyledWrapper = styled.div`
  .login {
    max-width: 320px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  .header {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  }
  .header p {
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #706b6b;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  form input {
    height: 40px;
    outline: none;
    border: 1px solid #cccccc;
    padding: 10px;
    font-size: 15px;
    border-radius: 8px;
  }
  form button {
    height: 40px;
    background-color: rgba(17, 17, 226, 0.562);
    color: #ffffff;
    font-size: 17px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  form button:hover {
    background-color: rgba(17, 17, 226, 0.8);
  }
  form span {
    text-align: center;
    font-size: 16px;
    padding-top: 10px;
    color: #706b6b;
  }
  form span a {
    text-decoration: none;
    color: rgba(36, 36, 207, 0.671);
    font-weight: 500;
    cursor: pointer;
  }
  .error {
    color: red;
    font-size: 14px;
    text-align: center;
  }
`;

export { Login, Register };
