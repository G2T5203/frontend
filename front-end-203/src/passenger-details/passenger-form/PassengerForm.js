import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PassengerForm = () => {
    return (
        <Box sx={{ width: '100%', maxWidth: 800, backgroundColor: '#223662', padding: 4, borderRadius: 2, color: 'white', margin: 'auto', marginTop: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Merriweather', fontSize: 20, fontWeight: 'bold' }}>
                Passenger information
            </Typography>
            <Typography variant="body2" gutterBottom>
                Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.
            </Typography>

            {/* Passenger 1 */}
            <Typography variant="body1" gutterBottom>
                Passenger 1 (Adult)
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
                <TextField variant="filled" label="First name" style={{ backgroundColor: 'white' }} fullWidth defaultValue="Brandon Jia Hao"></TextField>
                <TextField variant="filled" label="Last name" style={{ backgroundColor: 'white' }} fullWidth defaultValue="Hong" ></TextField>
                <TextField variant="filled" label="Seat No." style={{ backgroundColor: 'white' }} fullWidth ></TextField>
            </Box>

            {/* Passenger 2 */}
            <Typography variant="body1" gutterBottom>
                Passenger 2 (Adult)
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
                <TextField variant="filled" label="First name" style={{ backgroundColor: 'white' }} fullWidth ></TextField>
                <TextField variant="filled" label="Last name" style={{ backgroundColor: 'white' }} fullWidth ></TextField>
                <TextField variant="filled" label="Seat No." style={{ backgroundColor: 'white' }} fullWidth ></TextField>
            </Box>
        </Box>
    );
}

export default PassengerForm;
