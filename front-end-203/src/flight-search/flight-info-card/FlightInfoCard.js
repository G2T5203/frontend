import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const FlightInfoCard = ({
  airlineName,
  departureAirport,
  departureDate,
  departureTime,
  arrivalAirport,
  arrivalDate,
  arrivalTime,
  stops,
  travelTime,
  price,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: 'blue',
        color: 'white',
        maxWidth: 600,
        margin: '16px',
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {airlineName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              {departureAirport}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              {departureDate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              {departureTime}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Divider sx={{ flex: 1 }} />
              <AirplanemodeActiveIcon sx={{ fontSize: 20, margin: '0 8px' }} />
              <Divider sx={{ flex: 1 }} />
            </div>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              {arrivalAirport}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              {arrivalDate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              {arrivalTime}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              {travelTime} | {stops} stops
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'right' }}>
              ${price}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth>
              Book Now
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightInfoCard;
