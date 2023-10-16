import React, {useEffect} from "react";
import { useState } from "react";
import NavBar from "../nav-bar/NavigationBar"; // Import the Navbar component
import Banner from "./banner/Banner";
import "./FlightSearch.css";
import { Typography } from "@mui/material";
import FlightInfoCard from "./flight-info-card/FlightInfoCard";
import FilterTile from "./filter-tile/FilterTile";
import FlightSearchBar from "./flight-search-bar/FlightSearchBar";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {isAuthenticated, removeAuthToken, updateAuthHeadersFromCurrentUser, getCurrentUser} from "../auth";
import axios from "axios";

// values for the filter tile
const filterInfo = {
  airlines: ["Singapore Airlines", "Qatar Airways", "Air India", "Emirates"],
};

// values for the 2 location dropdowns
const searchLocations = {
  locations: ["Japan", "Singapore", "Taiwan", "India", "China"],
};

// flight search function
function FlightSearch() {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  //dummy code to check if all the data from homepage is brought to flight search screen
  const location = useLocation();
  const data = location.state;

  //authentication
  useEffect(() => {
    if (isAuthenticated()) {
      axios
          .get(apiUrl + "users/authTest")
          .then((response) => {
            // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
            if (response.status === 200) {
              updateAuthHeadersFromCurrentUser();
            } else {
              removeAuthToken();
              navigate("/signin");
              console.log("made an error at flightSearch 51")
            }
          })
          .catch((error) => {
            removeAuthToken();
            navigate("/signin");
            console.log(error);
          });
    } else {
      navigate("/signin");
        console.log("made an error at flightSearch 61")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // printng data from homepage
  console.log("This is data");
  console.log(data);

  // for setting flightdata array (containing data from fullsearch endpoint)
  const [departureFlightData, setDepartureFlightData] = useState([]);
  const [returnFlightData, setReturnFlightData] = useState([]);

  // to generate departure flight info cards
  const handleDepartureFlightData = (data) => {
    setDepartureFlightData(data);
  };

  // to generate return flight info cards
  const handleReturnFlightData = (data) => {
    setReturnFlightData(data || []);
  };

  // printing data from fullsearch endpoint
  // console.log("This is departure flightdata")
  // console.log(departureFlightData);

  // console.log("This is return flightdata")
  // console.log(returnFlightData);

  // for getting data from homepage (noGuest and flightClass are not used, warnings currently disabled)
  // eslint-disable-next-line
  const {
    trip,
    noGuest,
    // eslint-disable-next-line no-unused-vars
    flightClass,
    flyingFrom,
    flyingTo,
    departuredt,
    returndt,
  } = location.state;

  // Remove the enclosing quotes and convert to Day.js object
  const depDateObj = dayjs(departuredt.replace(/"/g, ""));
  const arrDateObj = dayjs(returndt.replace(/"/g, ""));

  // selectedTrip type variable, initialised to trip from homepage, for use to render the return flight info cards if the triptype is 2 way
  // const hasSesarched also used for conditional rendering of return flight section
  // const pax to store the number of pax, initialised to noGuest value from homepage, changes on search
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState(trip);
  const [pax, setPax] = useState(noGuest);
  const handleTripTypeChange = (newTripType) => {
    // for conditional rendering of the return flight info card section
    setSelectedTripType(newTripType);

    // set this to false so that the return flight info card section disappears when the trip type is changed back to one way and the return date section is cleared
    setHasSearched(false);
  };

  // for passing into the flight information cards (arrival and departure are not provided as data from fullsearch endpoint)
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  

  // for expansion control of departure flights collapsable section
  const [isDepartureAccordionExpanded, setDepartureAccordionExpanded] =
    useState(true);

  // constants that are used for keeping track of the departure and return date changes, so that the selected flight can be reset
  const [recentDepartureDate, setRecentDepartureDate] = useState(depDateObj);
  const [recentReturnDate, setRecentReturnDate] = useState(arrDateObj);

  // handleSearch function (whatever happens on click of the search button in the search bar)
  const handleSearch = (
    departureLocation,
    arrivalLocation,
    departureDate,
    returnDate,
    passengerCount
  ) => {
    // seting departure and arrival location based on input in search bar and set pax based on search bar input as well
    console.log("this is dep:" + departureDate);
    console.log("this is ret:" + returnDate);
    console.log("this is depdt:" + depDateObj);
    setDepartureLocation(departureLocation);
    setArrivalLocation(arrivalLocation);
    setPax(passengerCount);

    // for control of expansion of outbound accordion
    setDepartureAccordionExpanded(true);

    // to track if the search button has been clicked
    setHasSearched(true);

    setMinPrice(potentialMinPrice);
    setMaxPrice(potentialMaxPrice);

    // to reset selected departure flight if the departure date changed
    if (departureDate !== recentDepartureDate) {
      setSelectedDepartureFlight(null); // Reset the selected departure flight
      setRecentDepartureDate(departureDate); // Update the recent date
    }

    // to reset selected return flight if the return date changed
    if (returnDate !== recentReturnDate) {
      setSelectedReturnFlight(null); // Reset the selected return flight
      setRecentReturnDate(returnDate); // Update the recent date
    }
    
  };

  // pax printing
  console.log("number of passengers: " + pax);


  // constants for the selected departure and arrival flights that will render when the "Select" button is clicked
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

  // for handling outbound flight selection
  const handleDepartureFlightSelection = (flight) => {
    setSelectedDepartureFlight(flight);

    // Reset the filters
    //TODO: the display for min and max price does not change, only the value internally changes. do we want to change the displays?
    setMinPrice(0); // Assuming 0 as default min value
    setMaxPrice(Infinity);
    setPotentialMinPrice(0);
    setPotentialMaxPrice(Infinity);
  };

  // for handling return flight selection
  const handleReturnFlightSelection = (flight) => {
    setSelectedReturnFlight(flight);

    // Reset the filters
    setMinPrice(0); // Assuming 0 as default min value
    setMaxPrice(Infinity);
    setPotentialMinPrice(0);
    setPotentialMaxPrice(Infinity);
  };

  // to reset the selected departure flight
  const resetSelectedDepartureFlight = () => {
    setSelectedDepartureFlight(null);
  };

  // to reset the selected return flight
  const resetSelectedReturnFlight = () => {
    setSelectedReturnFlight(null);
  };

  // function for actions upon click of proceed to next screen button
  const handleProceedClick = () => {

    var bookingId;
    console.log(selectedDepartureFlight.departureDatetime.replace(/"/g, ""))
    try {
      axios.post(apiUrl + "bookings/new",
      {
        "bookingId": "-1",
          "username": getCurrentUser().username,
          "outboundRouteId": selectedDepartureFlight.routeId,
          "outboundPlaneId": selectedDepartureFlight.planeId,
          "outboundDepartureDatetime": selectedDepartureFlight.departureDatetime.replace(/"/g, ""),
          "partySize": 1
      }
      ).then((response) => {
        if (response.status === 201) {
         bookingId = response.data.bookingId;
         console.log("booking id is " + bookingId);
        } else {
          console.log(response.status)
        }
        // if there is inbound flight
        if (selectedReturnFlight != null) {
          try {
            axios.put(apiUrl + `bookings/updateInbound/${bookingId}`, {
              "inboundRouteId": selectedReturnFlight.routeId,
              "inboundPlaneId": selectedReturnFlight.planeId,
              "inboundDepartureDatetime": selectedReturnFlight.departureDatetime.replace(/"/g, "")
            }).then((response) => {
              if (response.status === 201) {
                console.log("updated inbound flight")
              } else {
                console.log(response.status)
              }
            });
            } catch (error){
            console.log(error);
            console.log("failed at axios inbound setting")
          }
        }
        let seatselectinfo = {
          bookingId: bookingId,
          departureFlight: selectedDepartureFlight,
          returnFlight: selectedReturnFlight ,
        }
        sessionStorage.setItem('bookingId', JSON.stringify(seatselectinfo.bookingId));

        console.log(seatselectinfo.bookingId + " is from search");
        navigate("/seatselection", {state : seatselectinfo});
      })
    } catch (error) {
      console.log(error);
      console.log("failed at axios p1")
    }

  };

  // for use of min and max price set on the filter tile in filtering the flight info cards rendered on click of the search button
  const [minPrice, setMinPrice] = useState(0); // Assuming 0 as default min value
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [potentialMinPrice, setPotentialMinPrice] = useState(0);
  const [potentialMaxPrice, setPotentialMaxPrice] = useState(Infinity);

  // when price changes but search button is not clicked
  const handlePriceChange = (min, max) => {
    setPotentialMinPrice(min);
    setPotentialMaxPrice(max);
  };

  // for time filter: declare 2 variables high and low for lower and upper limit
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(24);

  const handleFlightTime = (time) => {
    setLow(time[0]);
    setHigh(time[1]);
  };
  console.log("this is low: " + low);
  console.log("this is high: " + high);


  const selectedData = {
    departureFlight: {
      ...selectedDepartureFlight,
      departureLocation: departureLocation,
      arrivalLocation: arrivalLocation,
    },
    returnFlight: {
      ...selectedReturnFlight,
      departureLocation: arrivalLocation, // because it's the opposite for the return flight
      arrivalLocation: departureLocation, // opposite for the return flight
    }
  };
  sessionStorage.setItem('selectedFlights', JSON.stringify(selectedData));
  

  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>
      <div className="banner">
        <Banner />

        <div className="text">
          <Typography
            variant="h4"
            style={{
              fontFamily: "Merriweather, sans-serif",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Available Flights
          </Typography>
        </div>
        <div className="flight-search">
          <FlightSearchBar
            // setting flight data array
            onTripTypeChange={handleTripTypeChange}
            onFetchDepartureData={handleDepartureFlightData}
            onFetchReturnData={handleReturnFlightData}
            // setting locations in departure/arrival locations
            locations={searchLocations.locations}
            // initial population of search bar based on homepage inputs
            flyingFrom={flyingFrom}
            flyingTo={flyingTo}
            trip={trip}
            noGuest={noGuest}
            departuredt={depDateObj}
            returndt={arrDateObj}
            onSearch={handleSearch}
          />
        </div>
      </div>
      {/* Container for FilterTile */}
      <div className="filter-container">
        <FilterTile
          airlines={filterInfo.airlines}
          onPriceChange={handlePriceChange}
          onFlightTimeChange={handleFlightTime}
        />
      </div>
      <div className="proceed-button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedClick}
          style={{
            padding: "1rem",
            borderRadius: "0.5rem",
            margin: "20px 0", // Add some margin for spacing
            backgroundColor: "darkorange", // Color of your choice
            textTransform: "none",

            fontFamily: "Merriweather Sans",
            "&:hover": {
              backgroundColor: "orange",
            },
          }}
        >
          Proceed to next screen
        </Button>
      </div>
      <div className="accordion-container">
        <Accordion
          // these 2 lines are for default expansion of the outbound flights section on search. also handles case where it is collapsed manually before subsequent searches
          expanded={isDepartureAccordionExpanded}
          onChange={(event, newExpandedState) =>
            setDepartureAccordionExpanded(newExpandedState)
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Merriweather Sans", marginBottom: 2 }}
            >
              Outbound Flights
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {selectedDepartureFlight ? (
              <div style={{ marginBottom: "10px" }}>
                <Button
                  onClick={resetSelectedDepartureFlight}
                  sx={{
                    backgroundColor: "darkorange",
                    color: "white",
                    padding: "5px",
                    marginBottom: "1rem",
                    marginLeft: "43rem",
                    "&:hover": {
                      backgroundColor: "orange",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontSize={15}
                    sx={{
                      fontFamily: "Merriweather Sans",
                      textTransform: "none",
                    }}
                  >
                    Change Selection
                  </Typography>
                </Button>
                <FlightInfoCard
                  imageURL="https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"
                  departureAirport={departureLocation}
                  departureDate={
                    selectedDepartureFlight?.departureDatetime?.split("T")[0]
                  }
                  departureTime={selectedDepartureFlight?.departureDatetime
                    ?.split("T")[1]
                    .substring(0, 5)}
                  arrivalAirport={arrivalLocation}
                  arrivalDate={
                    selectedDepartureFlight?.departureDatetime?.split("T")[0]
                  }
                  arrivalTime={selectedDepartureFlight?.departureDatetime
                    ?.split("T")[1]
                    .substring(0, 5)}
                  stops="Direct"
                  travelTime={`${
                    selectedDepartureFlight.flightDuration.match(/(\d+)H/)[1]
                  } hr ${
                    selectedDepartureFlight.flightDuration.match(/(\d+)M/)[1]
                  } min`}
                  price={selectedDepartureFlight.basePrice.toFixed(2)}
                  flightNumber={selectedDepartureFlight.planeId}
                  bookNowLabel="Selected!"
                  onSelect={() => resetSelectedDepartureFlight()}
                  seats={selectedDepartureFlight.availableSeats}
                />
              </div>
            ) : (
              departureFlightData
                .filter(
                  (flight) =>
                    flight.basePrice >= minPrice &&
                    flight.basePrice <= maxPrice &&
                    parseInt(
                      flight.departureDatetime
                        .split("T")[1]
                        .substring(0, 5)
                        .split(":")[0]
                    ) >= low &&
                    parseInt(
                      flight.departureDatetime
                        .split("T")[1]
                        .substring(0, 5)
                        .split(":")[0]
                    ) <= high
                )
                .map((flight, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <FlightInfoCard
                      imageURL="https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"
                      departureAirport={departureLocation}
                      departureDate={flight.departureDatetime.split("T")[0]}
                      departureTime={flight.departureDatetime
                        .split("T")[1]
                        .substring(0, 5)}
                      arrivalAirport={arrivalLocation}
                      arrivalDate={flight.departureDatetime.split("T")[0]}
                      arrivalTime={flight.departureDatetime
                        .split("T")[1]
                        .substring(0, 5)}
                      stops="Direct"
                      travelTime={`${
                        flight.flightDuration.match(/(\d+)H/)[1]
                      } hr ${flight.flightDuration.match(/(\d+)M/)[1]} min`}
                      price={flight.basePrice.toFixed(2)}
                      flightNumber={flight.planeId}
                      onSelect={() => pax <= flight.availableSeats && handleDepartureFlightSelection(flight)}
                      bookNowLabel={pax <= flight.availableSeats ? "Select" : "Unavailable"}
                      seats={flight.availableSeats}
                      isDisabled={pax > flight.availableSeats}
                    />
                  </div>
                ))
            )}
          </AccordionDetails>
        </Accordion>

        {hasSearched && selectedTripType !== "One way" && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Merriweather Sans",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                Return Flights
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {selectedReturnFlight ? (
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    onClick={resetSelectedReturnFlight}
                    sx={{
                      backgroundColor: "darkorange",
                      color: "white",
                      padding: "5px",
                      marginBottom: "1rem",
                      marginLeft: "43rem",
                      "&:hover": {
                        backgroundColor: "orange",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize={15}
                      sx={{
                        fontFamily: "Merriweather Sans",
                        textTransform: "none",
                      }}
                    >
                      Change Selection
                    </Typography>
                  </Button>
                  <FlightInfoCard
                    imageURL="https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"
                    departureAirport={arrivalLocation}
                    departureDate={
                      selectedReturnFlight?.departureDatetime?.split("T")[0]
                    }
                    departureTime={selectedReturnFlight?.departureDatetime
                      ?.split("T")[1]
                      .substring(0, 5)}
                    arrivalAirport={departureLocation}
                    arrivalDate={
                      selectedReturnFlight?.departureDatetime?.split("T")[0]
                    }
                    arrivalTime={selectedReturnFlight?.departureDatetime
                      ?.split("T")[1]
                      .substring(0, 5)}
                    stops="Direct"
                    travelTime={`${
                      selectedReturnFlight.flightDuration.match(/(\d+)H/)[1]
                    } hr ${
                      selectedReturnFlight.flightDuration.match(/(\d+)M/)[1]
                    } min`}
                    price={selectedReturnFlight.basePrice.toFixed(2)}
                    flightNumber={selectedReturnFlight.planeId}
                    bookNowLabel="Selected!"
                    onSelect={() => resetSelectedReturnFlight()}
                    seats={selectedReturnFlight.availableSeats}
                  />
                </div>
              ) : (
                returnFlightData
                  .filter(
                    (flight) =>
                      flight.basePrice >= minPrice &&
                      flight.basePrice <= maxPrice &&
                      parseInt(
                        flight.departureDatetime
                          .split("T")[1]
                          .substring(0, 5)
                          .split(":")[0]
                      ) >= low &&
                      parseInt(
                        flight.departureDatetime
                          .split("T")[1]
                          .substring(0, 5)
                          .split(":")[0]
                      ) <= high
                  )
                  .map((flight, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <FlightInfoCard
                        imageURL="https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"
                        departureAirport={arrivalLocation}
                        departureDate={flight.departureDatetime.split("T")[0]}
                        departureTime={flight.departureDatetime
                          .split("T")[1]
                          .substring(0, 5)}
                        arrivalAirport={departureLocation}
                        arrivalDate={flight.departureDatetime.split("T")[0]}
                        arrivalTime={flight.departureDatetime
                          .split("T")[1]
                          .substring(0, 5)}
                        stops="Direct"
                        travelTime={`${
                          flight.flightDuration.match(/(\d+)H/)[1]
                        } hr ${flight.flightDuration.match(/(\d+)M/)[1]} min`}
                        price={flight.basePrice.toFixed(2)}
                        flightNumber={flight.planeId}
                        onSelect={() => pax <= flight.availableSeats && handleReturnFlightSelection(flight)}
                        bookNowLabel={pax <= flight.availableSeats ? "Select" : "Unavailable"}
                        seats={flight.availableSeats}
                        isDisabled={pax > flight.availableSeats}
                      />
                    </div>
                  ))
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default FlightSearch;
