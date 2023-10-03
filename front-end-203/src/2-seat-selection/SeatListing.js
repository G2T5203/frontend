import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import img from "./img.jpg";

const SeatListing = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#143965",
          padding: 2,
          width: "557px",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: 2 }}>
          <Box
            sx={{
              backgroundImage: `url(${img})`,
              height: "120px",
              width: "120px",
              backgroundPosition: "center",
              backgroundColor: "#143965",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
          {/* Text */}
          <Box
            sx={{
              paddingX: 2,
            }}
          >
            <Typography
              fontFamily={"Merriweather Sans"}
              color={"rgba(179, 186, 201, 1)"}
            >
              Economy
            </Typography>
            <Typography fontFamily={"Merriweather Sans"} color={"white"}>
              Emirates A380 Airbus
            </Typography>
          </Box>
        </Box>
        <Typography
          fontFamily={"Merriweather Sans"}
          color={"white"}
          variant="caption"
          mt={3}
        >
          Your booking is protected by Wingit
        </Typography>
        <Divider color={"grey"} sx={{ marginY: 2 }} />
        {/* Cost */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography color={"white"}> Person A: A1</Typography>
            <Typography color={"white"}> $100</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography color={"white"}> Person B: A2</Typography>
            <Typography color={"white"}> $100</Typography>
          </Box>
        </Box>

        <Divider color={"grey"} sx={{ marginY: 2 }} />

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              height: "50px",
            }}
          >
            <Typography color={"white"}> Total</Typography>
            <Typography color={"white"}> $200</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SeatListing;
