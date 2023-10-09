import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PassengerForm = ({ numGuests }) => {
    
    const renderPassengerFields = (index) => (
        <Box key={index}>
            <Typography variant="body1" gutterBottom>
                Passenger {index + 1} (Adult)
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 5 }}>
                <FormControl variant="filled" style={{ backgroundColor: 'white' }} fullWidth>
                    <InputLabel>Salutation</InputLabel>
                    <Select label="Salutation" defaultValue="Mr">
                        <MenuItem value={"Mr"}>Mr</MenuItem>
                        <MenuItem value={"Mrs"}>Mrs</MenuItem>
                        <MenuItem value={"Miss"}>Ms</MenuItem>
                        <MenuItem value={"Mdm"}>Mdm</MenuItem>
                        <MenuItem value={"Master"}>Master</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="filled" label="First name" style={{ backgroundColor: 'white' }} fullWidth />
                <TextField variant="filled" label="Last name" style={{ backgroundColor: 'white' }} fullWidth />
                <TextField variant="filled" label="Seat No." style={{ backgroundColor: 'white' }} fullWidth />
            </Box>
        </Box>
    );

    return (
        <Box sx={{ width: '100%', maxWidth: 800, backgroundColor: '#223662', padding: 4, borderRadius: 2, color: 'white', margin: 'auto', marginTop: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Merriweather', fontSize: 20, fontWeight: 'bold' }}>
                Passenger information
            </Typography>
            <Typography variant="body2" gutterBottom>
                Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.
            </Typography>
            
            {/* Dynamically rendering passenger fields */}
            {Array.from({ length: parseInt(numGuests) + 1 }).map((_, index) => renderPassengerFields(index))}
        </Box>
    );
}

export default PassengerForm;
