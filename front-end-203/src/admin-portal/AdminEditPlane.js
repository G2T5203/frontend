import React, { useState, useEffect } from "react";
import { Link, TextField, Button, Paper, Container } from "@mui/material";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import { isAuthenticated, removeAuthToken, updateAuthHeadersFromCurrentUser } from "../auth";

const PlaneUpdatingForm = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    planeId: "",
    capacity: "",
    model: "",
  });
  let location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(apiUrl + "planes/update/" + location.state.currentPlaneId, formData)
    .then((response) => {
      if (response.status === 200) {
        getPlane();
        const msgStr = formData.planeId + " has been updated!\n" +
          "Capcity: " + formData.capacity + "\n" +
          "Model: " + formData.model;
        alert(msgStr);
      } else {
        console.log("Did not update plane: " + response.status);
      }
    })
    .catch((error) => {
      console.log("Did not create plane: " + error);
    })
  };

  function getPlane() {
    console.log(location.state.currentPlaneId);
    axios.get(apiUrl + "planes/" + location.state.currentPlaneId)
      .then((response) => {
        // If the call fails, a html to the login page is sent back.
        const isResponseJsonType = response.headers.get('content-type')?.includes('application/json');
        if (response.data != null && isResponseJsonType) {
          setFormData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }


  // Calls immediately upon page load
  useEffect(() => {
    if (isAuthenticated()) {
      axios.get(apiUrl + "users/adminAuthTest").then((response) => {
        // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
        if (response.status === 200) {
          updateAuthHeadersFromCurrentUser();
          getPlane();
        } else {
          removeAuthToken();
          navigate('/adminPortal/login');
        }
      }).catch((error) => {
        removeAuthToken();
        navigate('/adminPortal/login');
      })
    } else {
      navigate('/adminPortal/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Container>
      <Link href="/adminPortal/planes">Go Back to Manage Planes</Link>
      <Paper elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 50,
          margin: 30,
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 50,
            margin: 100,
          }}
          onSubmit={handleSubmit}
        >
          <h1>{formData.planeId}</h1>
          <TextField
            style={{ marginBottom: "16px" }} // You can adjust the spacing
            label="Capacity"
            variant="outlined"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
          <TextField
            style={{ marginBottom: "16px" }} // You can adjust the spacing
            label="Model"
            variant="outlined"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary" p={3} fullWidth>
            Update Plane
          </Button>
        </form>

      </Paper>
    </Container>
  );
};

export default PlaneUpdatingForm;
