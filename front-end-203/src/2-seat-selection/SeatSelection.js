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
import {
  isAuthenticated,
  removeAuthToken,
  updateAuthHeadersFromCurrentUser,
} from "../auth";
import { useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const location = useLocation();
  let { bookingId, departureFlight, returnFlight } = location.state;
  //create seats array
  const [depFirstSeats, setDepFirstSeats] = useState([]);
  const [depBusinessSeats, setDepBusinessSeats] = useState([]);
  const [depEconomySeats, setDepEconomySeats] = useState([]);
  const [retFirstSeats, setRetFirstSeats] = useState([]);
  const [retBusinessSeats, setRetBusinessSeats] = useState([]);
  const [retEconomySeats, setRetEconomySeats] = useState([]);
  //math for number of rows
  const firstNumRows = Math.ceil(depFirstSeats.length / 2);
  const businessNumRows = Math.ceil(depBusinessSeats.length / 4);
  const economyNumRows = Math.ceil(depEconomySeats.length / 6);
  const retFirstNumRows = Math.ceil(retFirstSeats.length / 2);
  const retBusinessNumRows = Math.ceil(retBusinessSeats.length / 4);
  const retEconomyNumRows = Math.ceil(retEconomySeats.length / 6);
  const [option, setOption] = useState("outbound");

  const depdt = departureFlight.departureDatetime.replace(/"/g, "");
  const retdt = returnFlight.departureDatetime.replace(/"/g, "");

  const urlDep =
    apiUrl +
    `seatListings/matchingRouteListing/${departureFlight.planeId}/${departureFlight.routeId}/${depdt}`;
  const urlRet =
    apiUrl +
    `seatListings/matchingRouteListing/${returnFlight.planeId}/${returnFlight.routeId}/${retdt}`;
  //create booking departure flight
  const fetchDepSeatListings = () => {
    try {
      axios.get(urlDep).then((response) => {
        if (response.status === 200) {
          //first class filters
          const seatListings = response.data;
          // console.log(typeof seatListings);
          const filteredSeatListings = seatListings.filter(
            (listing) => listing.seatClass === "First"
          );
          const seatNumbers = filteredSeatListings.map(
            (listing) => listing.seatNumber
          );
          setDepFirstSeats(seatNumbers);
          // console.log(seatNumbers);
          //business class filters
          const filteredBusinessSeatListings = seatListings.filter(
            (listing) => listing.seatClass === "Business"
          );
          const businessSeatNumbers = filteredBusinessSeatListings.map(
            (listing) => listing.seatNumber
          );
          // console.log(businessSeatNumbers);
          setDepBusinessSeats(businessSeatNumbers);
          //economy class filters
          const filteredEconomySeatListings = seatListings.filter(
            (listing) => listing.seatClass === "Economy"
          );
          const economySeatNumbers = filteredEconomySeatListings.map(
            (listing) => listing.seatNumber
          );
          // console.log(economySeatNumbers);
          setDepEconomySeats(economySeatNumbers);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRetSeatListings = () => {
    try {
      axios.get(urlRet).then((response) => {
        if (response.status === 200) {
          //first class filters
          const seatListings = response.data;
          console.log(typeof seatListings);
          const filteredSeatListings = seatListings.filter(
            (listing) => listing.seatClass === "First"
          );
          const seatNumbers = filteredSeatListings.map(
            (listing) => listing.seatNumber
          );
          setRetFirstSeats(seatNumbers);
          console.log(seatNumbers);
          //business class filters
          const filteredBusinessSeatListings = seatListings.filter(
            (listing) => listing.seatClass === "Business"
          );
          const businessSeatNumbers = filteredBusinessSeatListings.map(
            (listing) => listing.seatNumber
          );
          setRetBusinessSeats(businessSeatNumbers);
          console.log(businessSeatNumbers);
          //economy class filters
          const filteredEconomySeatListings = seatListings.filter(
            (listing) => listing.seatClass === "Economy"
          );
          const economySeatNumbers = filteredEconomySeatListings.map(
            (listing) => listing.seatNumber
          );
          setRetEconomySeats(economySeatNumbers);
          console.log(economySeatNumbers);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      axios
        .get(apiUrl + "users/authTest")
        .then((response) => {
          // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
          if (response.status === 200) {
            updateAuthHeadersFromCurrentUser();
            fetchDepSeatListings();
            fetchRetSeatListings();
          } else {
            removeAuthToken();
            navigate("/signin");
          }
        })
        .catch((error) => {
          removeAuthToken();
          navigate("/signin");
        });
    } else {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Box>
              {option === "outbound" ? (
                <>
                  {/* departure flight rows */}
                  <Box>
                    {Array.from({ length: firstNumRows }, (_, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        {depFirstSeats
                          .slice(rowIndex * 2, rowIndex * 2 + 2)
                          .map((item, columnIndex) => (
                            <SingleSeat
                              key={columnIndex}
                              label={item}
                              catagory={"First Class"}
                            />
                          ))}
                      </div>
                    ))}
                    {Array.from({ length: businessNumRows }, (_, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        {depBusinessSeats
                          .slice(rowIndex * 4, rowIndex * 4 + 4)
                          .map((item, columnIndex) => (
                            <SingleSeat
                              key={columnIndex}
                              label={item}
                              catagory={"Business Class"}
                            />
                          ))}
                      </div>
                    ))}
                    <Box>
                      {Array.from({ length: economyNumRows }, (_, rowIndex) => (
                        <div
                          key={rowIndex}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          {depEconomySeats
                            .slice(rowIndex * 6, rowIndex * 6 + 6)
                            .map((item, columnIndex) => (
                              <SingleSeat
                                key={columnIndex}
                                label={item}
                                catagory={"Economy Class"}
                              />
                            ))}
                        </div>
                      ))}
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  {/* return flight rows */}
                  <Box>
                    {Array.from({ length: retFirstNumRows }, (_, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        {retFirstSeats
                          .slice(rowIndex * 2, rowIndex * 2 + 2)
                          .map((item, columnIndex) => (
                            <SingleSeat
                              key={columnIndex}
                              label={item}
                              catagory={"First Class"}
                            />
                          ))}
                      </div>
                    ))}
                    {Array.from(
                      { length: retBusinessNumRows },
                      (_, rowIndex) => (
                        <div
                          key={rowIndex}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                          }}
                        >
                          {retBusinessSeats
                            .slice(rowIndex * 4, rowIndex * 4 + 4)
                            .map((item, columnIndex) => (
                              <SingleSeat
                                key={columnIndex}
                                label={item}
                                catagory={"Business Class"}
                              />
                            ))}
                        </div>
                      )
                    )}
                    <Box>
                      {Array.from(
                        { length: retEconomyNumRows },
                        (_, rowIndex) => (
                          <div
                            key={rowIndex}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                            }}
                          >
                            {retEconomySeats
                              .slice(rowIndex * 6, rowIndex * 6 + 6)
                              .map((item, columnIndex) => (
                                <SingleSeat
                                  key={columnIndex}
                                  label={item}
                                  catagory={"Economy Class"}
                                />
                              ))}
                          </div>
                        )
                      )}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
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
