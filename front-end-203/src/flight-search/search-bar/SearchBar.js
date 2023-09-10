import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';

const FilterTile = () => {
  const [flightTime, setFlightTime] = useState([0, 24]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const airlines = ['Airline 1', 'Airline 2', 'Airline 3', 'Airline 4'];

  const handleFlightTimeChange = (event, newTime) => {
    setFlightTime(newTime);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAirlinesChange = (event) => {
    setSelectedAirlines(event.target.value);
  };

  const handleSearch = () => {
    // Print the NAMES of selected airlines to the console
    const airlineNames = selectedAirlines.map((airline) => airline);
    console.log('Selected Airlines:', airlineNames);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        width: '250px',
        backgroundColor: '#003c7c', // Blue background
        color: 'white', // White text color
        fontFamily: 'Merriweather Sans, sans-serif', // Font style
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px', // Increase spacing between elements
      }}
    >
      <Typography variant="h6">Filter Options</Typography>

      <div style={{ width: '100%' }}>
        <Typography variant="subtitle1">Time of Flight:</Typography>
        <Slider
          value={flightTime}
          onChange={handleFlightTimeChange}
          valueLabelDisplay="auto"
          min={0}
          max={24}
          step={1}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">{flightTime[0]}:00</Typography>
          <Typography variant="caption">{flightTime[1]}:00</Typography>
        </Box>
      </div>

      <div style={{ width: '100%' }}>
        <Typography variant="subtitle1">Price Range:</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption">${priceRange[0]}</Typography>
          <Typography variant="caption">${priceRange[1]}</Typography>
        </Box>
      </div>

      <div style={{ width: '100%' }}>
        <Typography variant="subtitle1">Airline Selector:</Typography>
        <Stack direction="column" spacing={1}>
          {/* Greyed "Select airlines" placeholder */}
          <FormControl fullWidth>
            <InputLabel id="airline-selector-label">Select Airlines</InputLabel>
            <Select
              labelId="airline-selector-label"
              id="airline-selector"
              multiple
              value={selectedAirlines}
              onChange={handleAirlinesChange}
              renderValue={() => null} // Display nothing in the select box
            >
              {airlines.map((airline) => (
                <MenuItem key={airline} value={airline}>
                  {airline}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Selected airline chips */}
          <div>
            {selectedAirlines.map((airline) => (
              <Chip
                key={airline}
                label={airline}
                onDelete={() => handleAirlinesChange({ target: { value: selectedAirlines.filter((a) => a !== airline) } })} // Remove the airline when the chip is deleted
              />
            ))}
          </div>
        </Stack>
      </div>

      {/* Search button with dark orange color */}
      <Button
        variant="contained"
        color="darkorange"
        style={{ marginTop: '20px' }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default FilterTile;
