import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from "@mui/material/Box"; // Add Box from Material UI

const FlightSearchBar2 = ( {locations} ) => {
  const [departureLocation, setDepartureLocation] = useState(null);
  const [arrivalLocation, setArrivalLocation] = useState(null);
  const [tripType, setTripType] = useState("one-way");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);

  const handleSearch = () => {
    // Implement your search functionality here
    // console.log("Searching...");
    // console.log("Departure Location:", departureLocation);
    // console.log("Arrival Location:", arrivalLocation);
    // console.log("Trip Type:", tripType);
    // console.log("Departure Date:", departureDate);
    // console.log("Return Date:", returnDate);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <Autocomplete
        id="departure-location"
        options={locations}
        renderInput={(params) => <TextField {...params} label="Departure" />}
        onChange={(event, newValue) => setDepartureLocation(newValue)}
        sx={{ marginRight: "10px", marginLeft: "10px", width: '250px' }}
      />

      <Autocomplete
        id="arrival-location"
        options={locations}
        renderInput={(params) => <TextField {...params} label="Arrival" />}
        onChange={(event, newValue) => setArrivalLocation(newValue)}
        sx={{ marginRight: "10px", marginLeft: "10px", width: '250px' }}
      />

      <ToggleButtonGroup
        value={tripType}
        exclusive
        onChange={(event, newTripType) => setTripType(newTripType)}
        aria-label="Trip Type"
        sx={{ marginRight: "10px", marginLeft: "10px" }}
      >
        <ToggleButton value="one-way" aria-label="One Way">
          One Way
        </ToggleButton>
        <ToggleButton value="round-trip" aria-label="Round Trip">
          Round Trip
        </ToggleButton>
      </ToggleButtonGroup>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>

      <DatePicker
        label="Departure Date"
        value={departureDate}
        onChange={(newValue) => setDepartureDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
        sx={{ marginRight: "10px", marginLeft: "10px" }}
      />

      {tripType === "round-trip" && (
        <DatePicker
          label="Return Date"
          value={returnDate}
          onChange={(newValue) => setReturnDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
          sx={{ marginRight: "10px", marginLeft: "10px" }}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ marginRight: "10px", marginLeft: "10px" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default FlightSearchBar2;
