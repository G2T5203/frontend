import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"; // Add Box from Material UI
import axios from 'axios';
import MyDatePicker from "../date-picker/MyDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FlightSearchBar = ( {locations, onSearch, trip, noGuest, flightClass, flyingFrom, flyingTo, departuredt, arrivaldt} ) => {

  // all variables initalised to values from home page (departurelocation, arrival location, triptype, departure time, arrival time)
  const [departureLocation, setDepartureLocation] = useState(flyingFrom);
  const [arrivalLocation, setArrivalLocation] = useState(flyingTo);
  const [tripType, setTripType] = useState(trip);
  const [departureDate, setDepartureDate] = useState(departuredt);
  const [returnDate, setReturnDate] = useState(arrivaldt);

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleSearch = () => {

    // calback function to parent component
    if (onSearch) {
      onSearch(departureLocation, arrivalLocation);
    }
  
    // Construct the URL with departure and arrival locations
    const url = `http://localhost:8080/routeListings/fullSearch/${departureLocation}/${arrivalLocation}/2023/12/17`;
  
    // Send a GET request to the constructed URL
    axios.get(url)
      .then((response) => {
        console.log("Response from the backend:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // print inputs to console
    console.log("Departure Location:", departureLocation);
    console.log("Arrival Location:", arrivalLocation);
    console.log("Trip Type:", tripType);
    console.log("Departure Date:", departureDate);
    console.log("Return Date:", returnDate);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{
        backgroundColor: "#143965",
        padding: "15px",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
        {/* departure location textField with dropdown*/}
      <Autocomplete
        id="departure-location"
        options={locations}
        value={departureLocation}
        defaultValue={flyingFrom}
        renderInput={(params) => <TextField {...params} placeholder="Departure" />}
        onChange={(event, newValue) => setDepartureLocation(newValue)}
        sx={{ marginRight: "10px",
        marginLeft: "10px",
        width: '250px',
        fontFamily:'Merriweather Sans',
        "& input": {
            color: "white", // white input text colour
            fontFamily: 'Merriweather Sans'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Default border color
            },
            '&:hover fieldset': {
              borderColor: 'white', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Border color on click/focus
            },
            '& .MuiSvgIcon-root': {
              color: 'white', // Color of the dropdown icon
            },
            '&::selection': {
              color: 'white', // Color of the text cursor (selection color)
              background: 'transparent', // Background color when text is selected
            },
        }}}
      />
        {/* departure location textField with dropdown*/}
      <Autocomplete
        id="arrival-location"
        options={locations}
        value={arrivalLocation}
        defaultValue={flyingTo}
        renderInput={(params) => <TextField {...params} placeholder="Arrival" />}
        onChange={(event, newValue) => setArrivalLocation(newValue)}
        sx={{ marginRight: "10px",
        marginLeft: "10px",
        width: '250px',
        "& input": {
            color: "white", // white input text colour
            fontFamily: 'Merriweather Sans'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Default border color
            },
            '&:hover fieldset': {
              borderColor: 'white', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Border color on click/focus
            },
            '& .MuiSvgIcon-root': {
              color: 'white', // Color of the dropdown icon
            },
            '&::selection': {
              color: 'white', // Color of the text cursor (selection color)
              background: 'transparent', // Background color when text is selected
            },
        } }}
      />
        {/* toggle button group to select number of stops and assign to triptype variable*/}
        <ToggleButtonGroup
        value={tripType}
        defaultValue={trip}
        exclusive
        onChange={(event, newTripType) => setTripType(newTripType)}
        aria-label="Trip Type"
        sx={{ marginRight: "10px", marginLeft: "10px" }}
      >
        <ToggleButton value="One way" aria-label="One Way" 
        sx={{
          backgroundColor: tripType === 'One way' ? 'darkorange' : 'transparent',
            color: 'white',
            '&.Mui-selected': {
              backgroundColor: 'darkorange',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkorange',
              },
            },
            borderColor: 'white',
            textTransform: 'none',
            fontFamily: 'Merriweather Sans',
          }}>
          One Way
        </ToggleButton>
        <ToggleButton value="Return" aria-label="Round Trip"
        sx={{
          backgroundColor: tripType === 'Return' ? 'darkorange' : 'transparent',
            color: 'white',
            '&.Mui-selected': {
              backgroundColor: 'darkorange',
              color: 'white',
              '&:hover': {
                backgroundColor: 'darkorange',
              },
            },
            borderColor: 'white',
            textTransform: 'none',
            fontFamily: 'Merriweather Sans',
          }}>
          Round Trip
        </ToggleButton>
      </ToggleButtonGroup>


      {/* Reusable MyDatePicker for Departure Date */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MyDatePicker
        label="Departure Date"
        value={departureDate}
        onChange={handleDepartureDateChange}
      />

      
        <MyDatePicker
        label="Return Date"
        value={returnDate}
        onChange={handleReturnDateChange}
        disabled={tripType !== "Return"}
        />
      

      </LocalizationProvider>
      
        {/*search button*/}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ marginRight: "10px", marginLeft: "10px", textTransform: 'none', fontFamily: 'Merriweather Sans', backgroundColor: 'darkorange',
        '&:hover': {
            backgroundColor: 'orange',
          },}}
      >
        Search
      </Button>
    </Box>
  );
};

export default FlightSearchBar;
