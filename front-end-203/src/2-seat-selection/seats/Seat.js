import { Box, Typography } from '@mui/material';
import React from 'react';

const SingleSeat = ({label, handleOnClick, catagory}) => {
    function getColor(catagory){
        switch(catagory){
            case "First Class":
                return "green";
            case "Business Class":
                return "orange";
            case "Economy Class":
                return "blue";
            default:
                return "white";
        }
    }
    function getSize(catagory){
        switch(catagory){
            case "First Class":
                return "165px";
            case "Business Class":
                return "71px";
            case "Economy Class":
                return "40px";
            default:
                return "10px";
        }
    }
    return (
        <>
         <Box sx={{
            backgroundColor: getColor(catagory),
            height: "40px" ,
            width: getSize(catagory),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2px"
         }} onClick={handleOnClick}>
            <Typography variant="body2" color={'white'}>{label} </Typography>


         </Box>
        </>
    )
}

export default SingleSeat;