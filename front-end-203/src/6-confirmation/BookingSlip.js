import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import FlightConfirm from "./FlightConfirmationDetails"

export default function BookingSlip({
  departureTime1,
  departureLocation1,
  arrivalTime1,
  arrivalLocation1,
  departureTime2,
  departureLocation2,
  arrivalTime2,
  arrivalLocation2,
  bookingID,
  passengerName,
  outboundFlightNumber,
  inboundFlightNumber,
  classType,
  outboundSeat,
  inboundSeat
}) {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          display: "flex",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          item
          xs={8}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#143965",
              borderRight: "2px solid black", // Vertical line
            }}
          >
            <Grid
              container
              item
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{ height: "100%", padding: "16px" }}
            >
              <FlightConfirm departureTime={departureTime1} departureLocation={departureLocation1} arrivalTime={arrivalTime1} arrivalLocation={arrivalLocation1}/>
              <FlightConfirm departureTime={departureTime2} departureLocation={departureLocation2} arrivalTime={arrivalTime2} arrivalLocation={arrivalLocation2}/>
              <Typography variant="caption" color="white" sx={{textAlign: "center", pl: "60px"}}>
                Booking ID: {bookingID}
              </Typography>
            </Grid>
          </div>
        </Grid>

        <Grid container item xs={4}>
          <Grid
            container
            item
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%", padding: "16px" , backgroundColor:"#F9AB55"}}
          >
            <Typography variant="h5" fontFamily={"Merriweather"}>{passengerName}</Typography>
            <div style={{ marginTop: "16px" }}>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Outbound Flight Number: {outboundFlightNumber}</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Inbound Flight Number: {inboundFlightNumber}</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>{classType}</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Outbound Seat Number: {outboundSeat}</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Inbound Seat Number: {inboundSeat}</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
