import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import HeroImage from "./planeWing.jpg";

const HomeTop = () => {
  return (
    <Container maxWidth="x1">
      <Box
        sx={{
          backgroundImage: `url(${HeroImage})`,
          //   backgroundColor: "primary.dark",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "1200",
          width: "100%",
        }}
      >
        <Typography> Hello world </Typography>
      </Box>
    </Container>
  );
};

export default HomeTop;
