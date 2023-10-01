import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PassengerForm = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: 800, backgroundColor: '#223662', padding: 4, borderRadius: 2, color: 'white', margin: 'auto' }}>            
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
                <FormControl variant="filled" fullWidth sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}>
                    <InputLabel>Salutation</InputLabel>
                    <Select label="Salutation" defaultValue="Mr">
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="filled" label="First name" fullWidth defaultValue="Brandon Jia Hao" sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}></TextField>
                <TextField variant="filled" label="Last name" fullWidth defaultValue="Hong" sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}></TextField>
                <TextField variant="filled" label="Seat No." fullWidth sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}></TextField>
            </Box>

            {/* Passenger 2 */}
            <Typography variant="body1" gutterBottom>
                Passenger 2 (Adult)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl variant="filled" fullWidth sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}>
                    <InputLabel>Salutation</InputLabel>
                    <Select label="Salutation">
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="filled" label="First name" fullWidth sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}></TextField>
                <TextField variant="filled" label="Last name" fullWidth sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}></TextField>
                <TextField variant="filled" label="Seat No." fullWidth sx={{ '.MuiFilledInput-root': { bgcolor: 'white' } }}></TextField>
            </Box>
        </Box>
    );
}

export default PassengerForm;
