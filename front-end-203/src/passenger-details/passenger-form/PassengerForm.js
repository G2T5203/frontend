import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PassengerForm = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: 500, backgroundColor: '#223662', padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Passenger information
            </Typography>
            <Typography variant="body2" gutterBottom>
                Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.
            </Typography>

            {/* Passenger 1 */}
            <Typography variant="body1" gutterBottom>
                Passenger 1 (Adult)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Salutation</InputLabel>
                    <Select label="Salutation" defaultValue="Mr">
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="outlined" label="First name" fullWidth defaultValue="Brandon Jia Hao" />
                <TextField variant="outlined" label="Last name" fullWidth defaultValue="Hong" />
                <TextField variant="outlined" label="Seat No." fullWidth />
            </Box>

            {/* Passenger 2 */}
            <Typography variant="body1" gutterBottom>
                Passenger 2 (Adult)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Salutation</InputLabel>
                    <Select label="Salutation">
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="outlined" label="First name" fullWidth />
                <TextField variant="outlined" label="Last name" fullWidth />
                <TextField variant="outlined" label="Seat No." fullWidth />
            </Box>
        </Box>
    );
}

export default PassengerForm;
