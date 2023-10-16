import { React, useState, useEffect } from "react";
import ProgressBar from "../progress-bar/ProgressBar";
import NavigationBar from "../nav-bar/NavigationBar";
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
  let { bookingId, departureFlight, returnFlight, noGuest } = location.state;
  //create seats array
  // const [depAllSeats, setDepAllSeats] = useState([null]); //array of json object
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
  const [depDisabledSeats, setDepDisabledSeats] = useState([]);
  const [retDisabledSeats, setRetDisabledSeats] = useState([]);
  const depdt = departureFlight.departureDatetime.replace(/"/g, "").replace(/:/g, "x");


  //number of seats left
  const [depCount, setDepCount] = useState(noGuest);
  const [retCount, setRetCount] = useState(noGuest);
  //selectedSeatsDep
  const [selectedSeatsDep, setSelectedSeatsDep] = useState([]);
  //selectedSeatsRet
  const [selectedSeatsRet, setSelectedSeatsRet] = useState([]);


  const urlDep =
    apiUrl +
    `seatListings/matchingRouteListing/${departureFlight.planeId}/${departureFlight.routeId}/${depdt}`;

  //create booking departure flight
  const fetchDepSeatListings = () => {
    console.log("called fetch dep")
    try {
      axios.get(urlDep).then((response) => {
        if (response.status === 200) {
          //first class filters
          const seatListings = response.data;
          // setDepAllSeats(seatListings);
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

          const disabledSeats = seatListings.filter(
              (listing) => listing.isBooked === true
        );
          const disabledSeatNumbers = disabledSeats.map(
              (listing) => listing.seatNumber
          )
          setDepDisabledSeats(disabledSeatNumbers);
          // console.log(disabledSeatNumbers);

          //check bookingid
          console.log(bookingId);


        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRetSeatListings = (urlRet) => {
      try {
        axios.get(urlRet).then((response) => {
          if (response.status === 200) {
            //first class filters
            const seatListings = response.data;

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

            const disabledSeats = seatListings.filter(
                (listing) => listing.isBooked === true
            );
            const disabledSeatNumbers = disabledSeats.map(
                (listing) => listing.seatNumber
            )
            setRetDisabledSeats(disabledSeatNumbers);
            // console.log(disabledSeatNumbers);

          }
        });
      } catch (error) {
        console.log(error);
      }

  };

  const disableSeats = (jsonObject) => {
    jsonObject.forEach(seat => {
      seat = document.getElementsByClassName(seat);
      const buttonElement = seat[0];
      buttonElement.disabled = true;
      buttonElement.id = "selected";
    })
  }


//api calls
  useEffect(() => {
    if (isAuthenticated()) {
      axios
        .get(apiUrl + "users/authTest")
        .then((response) => {
          // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
          if (response.status === 200) {
            updateAuthHeadersFromCurrentUser();
              fetchDepSeatListings();
              if (returnFlight != null) {
                const retdt = returnFlight.departureDatetime.replace(/"/g, "").replace(/:/g, "x");
                const urlRet = apiUrl + `seatListings/matchingRouteListing/${returnFlight.planeId}/${returnFlight.routeId}/${retdt}`;
                fetchRetSeatListings(urlRet);
              }
            }
            
           else {
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
    // selectedSeatsDep.forEach(element => {
    //    document.getElementByInnerHtml(element).id = "selected"
    // });
    // selectedSeatsRet.forEach(element => {
    //   document.getElementById(element).id = "selected"
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //changing of stuff
  useEffect(() => {
    if (option === "outbound") {
      disableSeats(depDisabledSeats)
    } else {
      disableSeats(retDisabledSeats)
    }

  }, [depDisabledSeats,option, retDisabledSeats]);

  function color(size) {
      switch (size) {
        case "200px":
          return "green"
        case "80px":
          return "orange"
        case "64px":
          return "blue"
        default:
          return "white"
      }

    }

    const handleToPassengerDetails = (event) => {
      console.log("navigating to passenger details");
      const data = {
          "outboundSeats": selectedSeatsDep,
          "inboundSeats": selectedSeatsRet,
          "noGuest": noGuest,
          "departureFlight": departureFlight,
          "returnFlight": returnFlight
      }
      navigate("/passengerdetails", {state: data});
    }

    const handleClick = (event) => {
    console.log(selectedSeatsDep );
    if (option === "outbound") {
      if (selectedSeatsDep.includes(event.target.innerText)) {

        //cancel reservation
        try{
          axios.put(apiUrl + `seatListings/cancelSeatBooking/${bookingId}`,
              {
                "planeId": departureFlight.planeId,
                "routeId": departureFlight.routeId,
                "departureDatetime": departureFlight.departureDatetime.replace(/"/g, ""),
                "seatNumber": event.target.innerText
              }).then((response) => {
                if (response.status === 200) {
                  console.log("successful cancelation")
                  setSelectedSeatsDep((prevSeats) => prevSeats.filter((seat) => seat !== event.target.innerText));
                  event.target.id = "NotSelected"
                  event.target.backgroundColor =  color(event.target.width);
                  setDepCount((prevCount) => prevCount + 1);
                } else {
                  console.log(response.status)
                }
          })
        } catch (error) {
          console.log(error)
          console.log("failed to cancel")
        }


      } else {
        //axios call goes below
        const payload =
            {
              "planeId": departureFlight.planeId,
              "routeId": departureFlight.routeId,
              "departureDatetime": departureFlight.departureDatetime.replace(/"/g, ""),
              "seatNumber": event.target.innerText,
              "bookingId": bookingId
            };
        // console.log(JSON.stringify(payload))
        try {
          axios.put(apiUrl + "seatListings/bookSeat/reserve", payload)
              .then((response) => {
                if (response.status === 200) {
                  console.log("successful reservation")
                  setSelectedSeatsDep([...selectedSeatsDep, event.target.innerText]);
                  event.target.id = "chosen-by-user";
                  setDepCount((prevCount) => prevCount - 1);
                } else {
                  console.log(response.status)
                }
              })
        } catch (error) {
          console.log("failing at outbound seat reservation")
          console.log(error)
        }

      }
    } else {

      if (selectedSeatsRet.includes(event.target.innerText)) {

        //cancel reservation
        try{
          axios.put(apiUrl + `seatListings/cancelSeatBooking/${bookingId}`,
              {
                "planeId": returnFlight.planeId,
                "routeId": returnFlight.routeId,
                "departureDatetime": returnFlight.departureDatetime.replace(/"/g, ""),
                "seatNumber": event.target.innerText
              }).then((response) => {
            if (response.status === 200) {
              console.log("successful cancelation")
              event.target.id = "NotSelected"
              event.target.backgroundColor =  color(event.target.width);
              setSelectedSeatsRet((prevSeats) => prevSeats.filter((seat) => seat !== event.target.innerText));
              setRetCount((prevCount) => prevCount + 1);
            } else {
              console.log(response.status)
            }
          })
        } catch (error) {
          console.log(error)
          console.log("failed to cancel")
        }


      } else {
        //axios call goes below
        const payload =
            {
              "planeId": returnFlight.planeId,
              "routeId": returnFlight.routeId,
              "departureDatetime": returnFlight.departureDatetime.replace(/"/g, ""),
              "seatNumber": event.target.innerText,
              "bookingId": bookingId
            };
        // console.log(JSON.stringify(payload))
        try {
          axios.put(apiUrl + "seatListings/bookSeat/reserve", payload)
              .then((response) => {
                if (response.status === 200) {
                  console.log("successful reservation")
                  setSelectedSeatsRet([...selectedSeatsRet, event.target.innerText]);
                  event.target.id = "chosen-by-user";

                  setRetCount((prevCount) => prevCount - 1);
                } else {
                  console.log(response.status)
                }
              })
        } catch (error) {
          console.log("failing at outbound seat reservation")
          console.log(error)
        }

      }
    }

  }

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
        </Typography> {returnFlight != null ? (
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
        </ToggleButtonGroup> ): (<Typography variant={"h4"} textAlign={"center"} p={2}> Outbound </Typography>)}
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
              width: "450px",
            }}
          >
            <Box>
              {option === "outbound" ? (
                <>
                  {/* departure flight rows */}
                  <Box>
                    {Array.from({ length: firstNumRows }, (_, rowIndex) => (
                      <div
                        key={rowIndex+"_dep"}
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
                              category={"First Class"}
                              handleOnClick={handleClick}
                              path="departure"
                            />
                          ))}
                      </div>
                    ))}
                    {Array.from({ length: businessNumRows }, (_, rowIndex) => (
                      <div
                        key={rowIndex+"_dep"}
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
                              category={"Business Class"}
                              handleOnClick={handleClick}
                              path={"departure"}
                            />
                          ))}
                      </div>
                    ))}
                    <Box>
                      {Array.from({ length: economyNumRows }, (_, rowIndex) => (
                        <div
                          key={rowIndex+"_dep"}
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
                                category={"Economy Class"}
                                handleOnClick={handleClick}
                                path={"departure"}
                              />
                            ))}
                        </div>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    {/*//TODO styling for this*/}
                    <Typography variant={"body1"}> OutBound Seats Remaining: {depCount}</Typography>
                  </Box>
                </>
              ) : (
                <>
                  {/* return flight rows */}
                  <Box>
                    {Array.from({ length: retFirstNumRows }, (_, rowIndex) => (

                      <div
                        key={rowIndex+"_ret"}
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
                              category={"First Class"}
                                handleOnClick={handleClick}
                            />
                          ))}
                      </div>
                    ))}
                    {Array.from(
                      { length: retBusinessNumRows },
                      (_, rowIndex) => (
                        <div
                          key={rowIndex+"_ret"}
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
                                category={"Business Class"}
                                handleOnClick={handleClick}
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
                            key={rowIndex+"_ret"}
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
                                  category={"Economy Class"}
                                handleOnClick={handleClick}
                                />
                              ))}
                          </div>
                        )
                      )}
                    </Box>
                  </Box>
                  <Box>
                    {/*//TODO styling for this*/}
                    <Typography variant={"body1"}> InBound Seats Remaining: {retCount}</Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          {/*TODO include return seats as well*/}
          <SeatListing depBookedSeats={selectedSeatsDep}/>
          <Button fullWidth variant="contained" m={2} onClick={handleToPassengerDetails}>
            To passenger details
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SeatSelection;
