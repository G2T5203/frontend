import { React, } from "react";
import { Typography, Grid, Paper} from "@mui/material";
import FlightConfirm from "./FlightConfirmationDetails"

export default function BookingSlip() {
//   const [bookingDetails, setBookingDetails] = useState("");
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
        {/* Left 80% section */}
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
              
              <FlightConfirm departureTime={"0940"} departureLocation={"SIN"} arrivalTime={"1140"} arrivalLocation={"BKK"}/>
              <FlightConfirm departureTime={"2100"} departureLocation={"BKK"} arrivalTime={"2300"} arrivalLocation={"SIN"}/>
              <Typography variant="caption" color="white">
                Booking ID: 1293201
              </Typography>
            </Grid>
          </div>
        </Grid>

        {/* Right 20% section */}
        <Grid container item xs={4}>
          <Grid
            container
            item
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%", padding: "16px" }}
          >
            <Typography variant="h4">Right Section</Typography>
            <div style={{ marginTop: "16px" }}>
              <Typography variant="body1">Text 1</Typography>
              <Typography variant="body1">Text 2</Typography>
              <Typography variant="body1">Text 3</Typography>
              <Typography variant="body1">Text 4</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
