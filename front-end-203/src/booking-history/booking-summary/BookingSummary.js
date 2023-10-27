import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableRow, TableCell, Divider } from '@mui/material';
import axios from 'axios';


const BookingDetail = () => {

    const baseURL = process.env.REACT_APP_API_BASE_URL;


    const booking = {
        id: '6201',
        routes: [
            {
                type: 'Outbound',
                from: 'Singapore',
                to: 'Taiwan',
                depart: '16:30',
                arrive: '20:30',
                date: '26/12/23',
                passengers: [
                    { name: 'Brandon', seat: 'A1' },
                    { name: 'Tom', seat: 'B2' }
                ]
            },
            {
                type: 'Return',
                from: 'Taiwan',
                to: 'Singapore',
                depart: '02:50',
                arrive: '04:20',
                date: '28/12/23',
                passengers: [
                    { name: 'Brandon', seat: 'A1' },
                    { name: 'Tom', seat: 'B2' }
                ]
            }
        ]
    };

    return (
        <Box sx={{ maxWidth: '80%', margin: 'auto', mt: 4, backgroundColor: '#143965', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom style={{ marginTop: '8px', color: 'white' }}>
                Booking Summary
            </Typography>
            <Divider />
            <Paper elevation={3} sx={{ p: 2, backgroundColor: '#E0E0E0' }}>
                <Typography variant="subtitle1" align="center" style={{ color: 'black' }}>
                    Booking ID: {booking.id}
                </Typography>
            </Paper>
            {booking.routes.map((route, idx) => (
                <Paper elevation={3} sx={{ mb: idx === booking.routes.length - 1 ? 0 : 2, p: 2, backgroundColor: '#FFFFFF' }} key={idx}>
                    <Typography variant="subtitle2" gutterBottom>
                        {route.type}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Date: {route.date}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {route.from} {route.depart} ⟶ {route.to} {route.arrive}
                    </Typography>
                    <Table size="small">
                        <TableRow>
                            <TableCell>Passenger</TableCell>
                            <TableCell>Seat No.</TableCell>
                        </TableRow>
                        {route.passengers.map((passenger, pIdx) => (
                            <TableRow key={pIdx}>
                                <TableCell>{passenger.name}</TableCell>
                                <TableCell>{passenger.seat}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </Paper>
            ))}
        </Box>
    );
};

export default BookingDetail;