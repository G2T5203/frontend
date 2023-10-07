import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Rating } from '@mui/lab';
import styled from 'styled-components';
import { Divider } from '@mui/material';

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  background-image: url('https://wallpapers.com/images/hd/sunset-emirates-airplane-gleunp0ia3hud96b.jpg');
  background-size: cover;
  background-position: center;
  margin-right: 16px;
`;

const CustomCard = styled(Card)`
  width: 500px;
  margin: 16px;
  background-color: #223662 !important;
  padding: 1rem;
  padding-bottom: 5rem;
  border-radius: 1rem!important;
`;

const CustomDivider = styled(Divider)`
  background-color: white;
`;

const CustomRating = styled(Rating)`
  & .MuiRating-iconEmpty {
    fill: transparent;
    stroke: white;
    stroke-width: 0.25;
  }

  & .MuiRating-iconFilled {
    stroke: white;
    stroke-width: 0.25;
  }
`;

const BookingSummary = () => {
  return (
    <CustomCard>
      <CardContent>
        <Box display="flex" alignItems="center">
          <ImageWrapper />
          <Box>
            <Typography variant="h6" sx={{color: 'white', fontFamily: "Merriweather Sans"}}>Economy</Typography>
            <Typography variant="h5" gutterBottom sx={{color: 'white', fontFamily: "Merriweather Sans", marginTop: "1rem", marginBottom: "1rem"}}>
              Emirates A380 Airbus
            </Typography>
            <Box display="flex" alignItems="center">
            <CustomRating name="read-only" value={4.2} readOnly size="small" />
              <Typography variant="body2" sx={{color: 'white', fontFamily: "Merriweather Sans"}}>
              &nbsp; Very Good &nbsp; 54 reviews
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="subtitle1" style={{ marginTop: '1rem', marginBottom: "1rem", color: 'white', fontFamily: "Merriweather Sans"}}>
          Your booking is protected by WingIt
        </Typography>
        <CustomDivider/>
        <Typography variant="h6" sx={{color: 'white', fontFamily: "Merriweather Sans", marginTop: '1rem'}}>Seat Selected</Typography>
        <Box display="flex" justifyContent="space-between" marginTop="16px">
          
          <Typography variant="h6" sx={{color: 'white'}}>A1</Typography>
          <Typography variant="h6" sx={{color: 'white', fontFamily: "Merriweather Sans"}}>100</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" sx={{color: 'white'}}>A2</Typography>
          <Typography variant="body1">&nbsp;</Typography>
          <Typography variant="h6" sx={{color: 'white', fontFamily: "Merriweather Sans", marginBottom: '1rem'}}>100</Typography>
        </Box>
        <CustomDivider/>
        <Box display="flex" justifyContent="space-between" marginTop="16px" marginBottom={"16px"}>
          <Typography variant="h5" sx={{color: 'white', fontFamily: "Merriweather Sans"}}>Total</Typography>
          <Typography variant="h5" sx={{color: 'white', fontFamily: "Merriweather Sans"}}>$200</Typography>
        </Box>
        <CustomDivider/>
      </CardContent>
    </CustomCard>
  );
};

export default BookingSummary;
