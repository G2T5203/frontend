import React from "react";
import {
  Box,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const customTheme = createTheme({
  typography: {
    h5: {
      fontWeight: "bold",
      color: "white",
    },
  },
});

const BlueRoundedRectangle = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Paper
        sx={{
          background: "rgba(37, 78, 158, 0.6)", // Blue translucent background
          borderRadius: "16px", // Rounded corners
          padding: "16px", // Padding around content
          paddingX: "20px",
          paddingRight: "70px",
          textAlign: "left", // Center the content
        }}
      >
        <Typography variant="h5" pb={3}>
          Where to next?
        </Typography>
        <Typography variant="h5">Get ready for your</Typography>
        <Typography variant="h5" pb={3}>
          {" "}
          next adventure...
        </Typography>

        <Typography variant="subtitle1">Book now</Typography>
      </Paper>
    </ThemeProvider>
  );
};

export default BlueRoundedRectangle;
