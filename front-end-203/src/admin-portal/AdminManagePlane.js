import React, { useState, useEffect } from "react";
import { Link, TextField, Button, Paper, Container } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { isAuthenticated, removeAuthToken, updateAuthHeadersFromCurrentUser } from "../auth";

const PlaneUpdatingForm = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    planeId: "",
    capacity: "",
    model: "",
  });
  const [allPlanes, setAllPlanes] = useState([]);
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

    axios.post(apiUrl + "planes/new", formData)
    .then((response) => {
      if (response.status === 201) {
        getAllPlanes();
      } else {
        console.log("Did not create plane: " + response.status);
      }
    })
    .catch((error) => {
      console.log("Did not create plane: " + error);
    })

    // You can access the values of planeId, capacity, and model from formData
    console.log("Plane ID:", formData.planeId);
    console.log("Capacity:", formData.capacity);
    console.log("Model:", formData.model);
  };

  function getAllPlanes() {
    axios.get(apiUrl + "planes")
      .then((response) => {
        // If the call fails, a html to the login page is sent back.
        const isResponseJsonType = response.headers.get('content-type')?.includes('application/json');
        if (response.data != null && isResponseJsonType) {
          setAllPlanes(response.data)
        } else {
          setAllPlanes([])
        }
      })
      .catch((error) => {
        console.log(error);
        setAllPlanes([]);
      })
  }

  function onDelete(planeId) {
    // TODO: delete by planeId and then also call get all planes again.
    axios.delete(apiUrl + "planes/delete/" + planeId)
    .then(() => {
      getAllPlanes();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function onEdit(planeId) {
    let data = {
      currentPlaneId: planeId
    };
    navigate("/adminPortal/planes/edit", { state: data });
  }

  // Calls immediately upon page load
  useEffect(() => {
    if (isAuthenticated()) {
      axios.get(apiUrl + "users/adminAuthTest").then((response) => {
        // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
        if (response.status === 200) {
          updateAuthHeadersFromCurrentUser();
          getAllPlanes();
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
      <Link href="/adminPortal/home">Go Back Home</Link>
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
          <TextField
            style={{ marginBottom: "16px" }} // You can adjust the spacing
            label="Plane ID"
            variant="outlined"
            name="planeId"
            value={formData.planeId}
            onChange={handleInputChange}
          />
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
            Add Plane
          </Button>
        </form>


        <div className="All-Planes-Display">
          <div>
            <Button onClick={getAllPlanes} variant="contained">Refresh Planes List</Button>
            <h1>All Planes (Count: {allPlanes != null ? allPlanes.length : 0})</h1>
            <ol>
              {allPlanes.length > 0 ? (
                allPlanes.map(item => (
                  <li key={item.planeId} style={{fontSize: '24px'}}>
                    {item.planeId}-{item.model} ({item.capacity})
                    &nbsp; &nbsp; &nbsp;
                    <Button onClick={() => {onEdit(item.planeId);}} variant="contained" color="secondary">EDIT</Button>
                    &nbsp;
                    <Button onClick={() => {onDelete(item.planeId);}} variant="contained" color="error">DELETE</Button>
                    <br />
                    <br />
                  </li>
                ))
              ) : (
                <p></p>
              )}
            </ol>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default PlaneUpdatingForm;
