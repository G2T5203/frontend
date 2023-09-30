import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Select, MenuItem, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProgressBar from '../progress-bar/ProgressBar';

const PassengerDetails = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        WingIt
                    </Typography>
                    <Button color="inherit">Book Flights</Button>
                    <Button color="inherit">My Bookings</Button>
                    <SearchIcon />
                </Toolbar>
            </AppBar>
            <ProgressBar />
            <Container style={{ backgroundImage: 'url(https://media.npr.org/assets/img/2021/10/06/gettyimages-1302813215_wide-6c48e5a6aff547d2703693450c4805978de47435.jpg)', backgroundSize: 'cover', padding: '50px 0' }}>
                <Typography variant="h5" gutterBottom>
                    Passenger Details
                </Typography>
                
                <LinearProgress variant="determinate" value={50} style={{ marginBottom: '20px' }} />  {/* Adjust value as needed */}
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">
                        Time Remaining: 07:30
                    </Typography>
                </div>
            
                <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Passenger Information
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.
                    </Typography>
                    
                    <div>
                        <Typography variant="body1">
                            Passenger 1 (Adult)
                        </Typography>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Select>
                                <MenuItem value="Mr">Mr</MenuItem>
                                <MenuItem value="Ms">Ms</MenuItem>
                            </Select>
                            <TextField label="First name" />
                            <TextField label="Last name" />
                            <TextField label="Seat No." />
                        </div>
                    </div>
                    
                    {/* Passenger 2 */}

                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        Proceed to Review
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default PassengerDetails;
