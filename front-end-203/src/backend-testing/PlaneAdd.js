import React, { useState } from "react";
import { TextField, Button, Paper, Container } from "@mui/material";

const PlaneUpdatingForm = () => {
  const [formData, setFormData] = useState({
    planeID: "",
    capacity: "",
    model: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the values of planeID, capacity, and model from formData
    console.log("Plane ID:", formData.planeID);
    console.log("Capacity:", formData.capacity);
    console.log("Model:", formData.model);

    //UNCOMMENT when doing real logic
    // try {
    //   const response = await axios.post(apiUrl + "/planes/update/{formData.planeID}", formData);

    //   if (response.status === 201) {
    //     console.log("Update Successful! HTTP 201");
    //     alert("Update Successful!");
    //   }else {
    //     console.log("Update failed:", response.data.error);
    //   }
    // } catch (error) {
    //   console.error("Update failed", error);
    // }
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
          <TextField
            style={{ marginBottom: "16px" }} // You can adjust the spacing
            label="Plane ID"
            variant="outlined"
            name="planeID"
            value={formData.planeID}
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
          <Button type="submit" variant="contained" color="primary" p={3}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default PlaneUpdatingForm;
