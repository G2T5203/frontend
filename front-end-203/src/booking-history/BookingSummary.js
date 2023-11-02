import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableRow, TableCell, Divider } from '@mui/material';
import axios from 'axios';
import {
    getCurrentUser,
    isAuthenticated,
    updateAuthHeadersFromCurrentUser,
} from "../auth";

const BookingSummary = () => {
    const [bookings, setBookings] = useState([]);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const username = getCurrentUser().username;

    useEffect(() => {
        if (isAuthenticated()) {
            updateAuthHeadersFromCurrentUser();
            axios.get(apiUrl + `bookings/${username}`)
                .then(response => {
                    setBookings(response.data);
                    console.log("Retrieved bookings:", response.data);
                })
                .catch(error => {
                    console.error("Failed to fetch bookings:", error);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ maxWidth: '80%', margin: 'auto', mt: 4, backgroundColor: '#143965', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom style={{ marginTop: '8px', color: 'white' }}>
                Booking Summary
            </Typography>
            <Divider />
            {bookings.map((booking, idx) => (
                <Paper elevation={3} sx={{ mb: idx === bookings.length - 1 ? 0 : 2, p: 2, backgroundColor: '#E0E0E0' }} key={idx}>
                    <Typography variant="subtitle1" align="center" style={{ color: 'black' }}>
                        Booking ID: {booking.bookingId}
                    </Typography>
                    <Divider style={{ margin: '16px 0' }} />
                    <Typography variant="body2">
                        Outbound Flight
                    </Typography>
                    <Typography variant="body2" style={{ marginBottom: '8px', color: 'black' }}>
                        Date: {
                            new Date(booking.outboundDepartureDatetime).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })
                        }
                        <br />
                        {booking.outboundDepartureDestination} →  {booking.outboundArrivalDestination}
                    </Typography>
                    <Typography variant="body2">
                    </Typography>
                    <Table size="small">
                        <TableRow>
                            <TableCell>Passenger Name</TableCell>
                            <TableCell>Seat Number</TableCell>
                        </TableRow>
                        {Object.entries(booking.outboundSeatNumbers || {}).map(([name, seat]) => (
                            <TableRow key={seat}>
                                <TableCell>{seat}</TableCell>
                                <TableCell>{name}</TableCell>
                            </TableRow>
                        ))}
                    </Table>

                    {booking.inboundSeatNumbers && Object.keys(booking.inboundSeatNumbers).length > 0 && (
                        <>

                            <Divider style={{ margin: '16px 0' }} />
                            <Typography variant="body2" style={{ marginTop: '16px' }}>
                                Return Flight
                            </Typography>
                            <Typography variant="body2" style={{ marginBottom: '8px', color: 'black' }}>
                                Date: {
                                    new Date(booking.inboundDepartureDatetime).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })
                                }
                                <br />
                                {booking.inboundDepartureDestination} →  {booking.inboundArrivalDestination}
                            </Typography>
                            <Typography variant="body2">
                            </Typography>
                            <Table size="small">
                                <TableRow>
                                    <TableCell>Passenger Name</TableCell>
                                    <TableCell>Seat Number</TableCell>
                                </TableRow>
                                {Object.entries(booking.inboundSeatNumbers).map(([name, seat]) => (
                                    <TableRow key={seat}>
                                        <TableCell>{seat}</TableCell>
                                        <TableCell>{name}</TableCell>
                                    </TableRow>
                                ))}
                            </Table>
                        </>
                    )}
                </Paper>
            ))}

        </Box>
    );
};

export default BookingSummary;
