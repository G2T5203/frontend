import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Select, MenuItem, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProgressBar from '../progress-bar/ProgressBar';
import PassengerForm from './passenger-form/PassengerForm'
import Banner from "./banner/Banner";
import NavBar from "../nav-bar/NavigationBar"; // Import the Navbar component


const PassengerDetails = () => {
    return (
        <div>
            <div className="nav">
                <NavBar />
            </div>
            <div className="banner">
                <Banner />
            </div>
            <ProgressBar />

            <PassengerForm />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25vh'
            }}>
                <Button variant="contained" color="primary">
                    Proceed to Review
                </Button>
            </div>

        </div>

    );
}

export default PassengerDetails;
