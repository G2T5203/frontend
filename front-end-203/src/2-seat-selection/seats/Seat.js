import { Button} from '@mui/material';
import React from 'react';
import "./Seat.css"

const SingleSeat = ({label, category, handleOnClick}) => {
    function getColor(category){
        switch(category){
            case "First Class":
                return "blue";
            case "Business Class":
                return "blue";
            case "Economy Class":
                return "blue";
            default:
                return "white";
        }
    }
    function getSize(category){
        switch(category){
            case "First Class":
                return "200px";
            case "Business Class":
                return "80px";
            case "Economy Class":
                return "20px";
            default:
                return "10px";
        }
    }
    return (
        <>
         <Button id={"notSelected"} className={label} sx={{
            backgroundColor: "rgba(37, 78, 158, 1)",
            height: "40px" ,
            width: getSize(category),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2px",
            color: "white",
            fontSize: "15px",
            fontFamily: "Roboto"
         }} onClick={handleOnClick} >
            {/* <Typography variant="body2" color={'white'} >{label} </Typography> */}
            {label}


         </Button>
        </>
    )
}

export default SingleSeat;