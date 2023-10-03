import React from "react";
import ProgressBar from "../progress-bar/ProgressBar";
import NavigationBar from "../nav-bar/NavigationBar";
import Seats from "./seats/Seats";
import SeatListing from "./SeatListing";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";

const SeatSelection = () => {
  const [option, setOption] = React.useState("outbound");

  const handleChange = (event, newOption) => {
    setOption(newOption);
  };
  return (
    <>
      <div>
        <NavigationBar />
      </div>
      <ProgressBar currentStep={"Seat Selection"} number={1} />
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant={"h5"} textAlign={"center"} p={2}>
          Selecting For
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={option}
          exclusive
          onChange={handleChange}
          sx={{
            marginX: 3,
          }}
        >
          <ToggleButton
            value="outbound"
            fullWidth
            sx={{
              paddingX: "60px",
            }}
          >
            Outbound
          </ToggleButton>
          <ToggleButton
            value="inbound"
            fullWidth
            sx={{
              paddingX: "60px",
            }}
          >
            Inbound
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          justifyContent: "space-evenly",
          display: "flex",
          padding: 4,
        }}
      >
        <Seats sx={{ padding: "50px" }} />
        <Box>
          <SeatListing />
          <Button fullWidth variant="contained" m={2}>
            To passenger details
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SeatSelection;
