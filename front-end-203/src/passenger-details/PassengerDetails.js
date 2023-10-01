import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Select, MenuItem, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProgressBar from '../progress-bar/ProgressBar';
import PassengerForm from './passenger-form/PassengerForm'

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
            <Container style={{ backgroundImage: 'url({https://media.npr.org/assets/img/2021/10/06/gettyimages-1302813215_wide-6c48e5a6aff547d2703693450c4805978de47435.jpg})', backgroundSize: 'cover', padding: '50px 0' }}>
                <Typography variant="h5" gutterBottom>
                    Passenger Details
                </Typography>

                <LinearProgress variant="determinate" value={50} style={{ marginBottom: '20px' }} />  {/* Adjust value as needed */}

                <PassengerForm />

            
                    <Button variant="contained" color="primary">
                        Proceed to Review
                    </Button>


            </Container>
        </div>
    );
}

export default PassengerDetails;
