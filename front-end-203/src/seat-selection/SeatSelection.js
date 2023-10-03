import React from 'react';
import { Button} from '@mui/material';
import ProgressBar from './progress-bar/ProgressBar';
import Banner from "./banner/Banner";
import NavBar from "../nav-bar/NavigationBar"; // Import the Navbar component
import Seats from './seats/Seats'


const SeatSelection = () => {
    return (
        <div>
            <div className="nav">
                <NavBar />
            </div>
            <div className="banner">
                <Banner />
            </div>
            <ProgressBar />

            <Seats/>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '25vh'
            }}>
                <Button variant="contained" color="primary">
                    Proceed to Passenger Details
                </Button>
            </div>

        </div>

    );
}

export default SeatSelection;
