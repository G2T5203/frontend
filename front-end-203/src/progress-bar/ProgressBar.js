import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const ProgressBar = () => {
    const [currentStep, setCurrentStep] = useState(3);  // Temporarily put number 3)

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}>
            <Tabs value={currentStep} variant="scrollable" scrollButtons="auto">
                <Tab label="1 Flights" />
                <Tab label="2 Seat Selection" />
                <Tab label="3 Passenger Details" />
                <Tab label="4 Review" />
                <Tab label="5 Payment" />
                <Tab label="6 Confirmation" />
            </Tabs>
        </Box>
    );
}

export default ProgressBar;
