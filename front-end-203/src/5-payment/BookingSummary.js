import React, { useState, useEffect } from 'react';
import axios from 'axios';  import { Card, CardContent, Typography, Box } from '@mui/material';
import { Rating } from '@mui/lab';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';


const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  background-image: url('https://wallpapers.com/images/hd/sunset-emirates-airplane-gleunp0ia3hud96b.jpg');
  background-size: cover;
  background-position: center;
  margin-right: 16px;
  border-radius: 1rem !important;
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

  //just using fixed price for now
  const fixedFare = 100;

  // Calculate the total fare
  const tripType = sessionStorage.getItem('tripType') || "One way";
  const passengerData = JSON.parse(sessionStorage.getItem('passengerData'));
  const totalFare = Array.isArray(passengerData) ? passengerData.length * fixedFare : 0;
  const [totalChargedPrice, setTotalChargedPrice] = useState(0);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const bookingId = sessionStorage.getItem('bookingId')



  useEffect(() => {
    const fetchChargedPrice = async () => {
        try {
            const url1 = apiUrl + `bookings/calculateChargedPrice/${bookingId}`; 
            const response = await axios.put(url1);
            setTotalChargedPrice(response.data.totalChargedPrice);
            console.log('Response from backend:', response.data);

        } catch (error) {
            console.error("Failed to fetch charged price:", error);
        }
    };

    fetchChargedPrice();
}, []);

  console.log(passengerData);
  console.log(totalFare)

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Passengers' Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Seat Number</TableCell>
            <TableCell sx={{ color: 'white' }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(passengerData) && passengerData.map((passenger, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: 'white' }}>{`${passenger.salutation} ${passenger.firstName} ${passenger.lastName}`}</TableCell>
              <TableCell sx={{ color: 'white' }}>
                {`Outbound: ${passenger.outboundSeat}`}
                {tripType === "Return" && `, Return: ${passenger.returnSeat}`}
              </TableCell>
              <TableCell sx={{ color: 'white' }}>{`$${fixedFare}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography sx={{color: 'white',
       margin: '1rem', 
       fontFamily:'Merriweather Sans',
       display: 'flex',
       justifyContent: 'center'}}>Total Price: {totalChargedPrice}</Typography>
      <CustomDivider></CustomDivider>
      </CardContent>
    </CustomCard>
  );
};

export default BookingSummary;
