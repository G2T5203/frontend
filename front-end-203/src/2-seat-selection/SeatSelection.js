import { React, useState, useEffect } from "react";
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
import SingleSeat from "./seats/Seat";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SeatSelection = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
  const data = location.state;
  console.log("this is " + JSON.stringify(data));

  //create seats array
  const [firstSeats, setFirstSeats] = useState([
    "A1",
    "A2",
    "B1",
    "B2",
    "B3",
    "B4",
  ]);
  const [businessSeats, setBusinessSeats] = useState([
    "C1",
    "C2",
    "C3",
    "C4",
    "D1",
    "D2",
    "D3",
    "D4",
  ]);
  const [economySeats, setEconomySeats] = useState([
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
  ]);
  //math for number of rows
  const firstNumRows = Math.ceil(firstSeats.length / 2);
  const businessNumRows = Math.ceil(businessSeats.length / 4);
  const economyNumRows = Math.ceil(economySeats.length / 6);  

  // const fetchSeatListings = async () => {
  //   try {
  //     const response = await axios.get("/seatListings/matchingRouteListing", {
  //       params: {
  //         planeId: "SQ123",
  //         routeId: 1,
  //         departureDatetime: "2023-10-01T07:00:00",
  //       },
  //     });
  //     setSeatListings(response.data);
  //     console.log(`Number of entries: ${response.data.length}`);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchSeatListings();
  // }, []);
  const [option, setOption] = useState("outbound");

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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* //flight Box */}
        <Box
          sx={{
            backgroundColor: "lightGrey",
            padding: "20px",
            borderRadius: "10px",
            width: "360px",
          }}
        >
          {/* First class rows */}
          <Box sx={{}}>
            {Array.from({ length: firstNumRows }, (_, rowIndex) => (
              <div
                key={rowIndex}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {firstSeats
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((item, columnIndex) => (
                    <SingleSeat key={columnIndex} label={item} catagory={"First Class"} />
                  ))}
              </div>
            ))}
          </Box>
          {/* business class rows */}
          {Array.from({ length: businessNumRows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {businessSeats
                .slice(rowIndex * 4, rowIndex * 4 + 4)
                .map((item, columnIndex) => (
                  <SingleSeat key={columnIndex} label={item} catagory={"Business Class"}/>
                ))}
            </div>
          ))}
          {/* Economy class rows */}
          <Box>
            {Array.from({ length: economyNumRows }, (_, rowIndex) => (
              <div
                key={rowIndex}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {economySeats
                  .slice(rowIndex * 6, rowIndex * 6 + 6)
                  .map((item, columnIndex) => (
                    <SingleSeat key={columnIndex} label={item} catagory={"Economy Class"}/> // Pass the item to your pre-made component
                  ))}
              </div>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SeatSelection;
