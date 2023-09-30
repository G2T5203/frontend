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
              <Typography variant="caption" color="white" sx={{textAlign: "center", pl: "60px"}}>
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
            sx={{ height: "100%", padding: "16px" , backgroundColor:"#F9AB55"}}
          >
            <Typography variant="h5" fontFamily={"Merriweather"}>Mr Jared Hong</Typography>
            <div style={{ marginTop: "16px" }}>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Flight Number: SQ482</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Economy Class</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Outbound Seat Number: 21B</Typography>
              <Typography variant="body1" fontFamily={"Noto Sans"}>Inbound Seat Number: 42C</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
