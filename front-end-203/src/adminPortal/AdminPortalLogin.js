import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Paper, Container } from "@mui/material";
import { setAuthToken, getCurrentUser, getUserByUsernameAndEmail, getAllCookies } from "../auth";

const AdminPortalLogin = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(String);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleLoginSuccess = (jwtResponse) => {
    // Set JWT token in cookies or headers, including user data
    const adminUser = {
      username: formData.username,
      email: formData.email,
      // Add other user-related data here
    };
    setAuthToken(jwtResponse.data, adminUser);


    navigate('/adminPortal/home');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can access the values of planeID, capacity, and model from formData
    setErrorMsg("Trying to Login")

    try {
      const jwtResponse = await axios.post(
        apiUrl + "api/auth/adminToken",
        {},
        {
          auth: {
            username: formData.username,
            password: formData.password,
          },
        }
      );
      if (jwtResponse.status == 200) {
        handleLoginSuccess(jwtResponse);
      } else {
        setErrorMsg("Login failed: " + jwtResponse.status);
        console.log('JWT Response:', jwtResponse);
      }
    } catch (error) {
      setErrorMsg("Login failed: " + error);
      console.error("Login failed", error);
    }
  };

  return (
    <Container>
      <Paper elevation={3}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 5,
            margin: 3,
          }}
          onSubmit={handleSubmit}
          >
          <p style={{color:'red'}}>{errorMsg}</p>
          <TextField
            style={{ marginBottom: "16px" }} // You can adjust the spacing
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            style={{ marginBottom: "16px" }} // You can adjust the spacing
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary" p={3}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminPortalLogin;
