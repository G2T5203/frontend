import React from 'react';
import './FlightInfo.css';

const FlightInfo = ({ airportCode, airportName, time, date, stops, airline, aircraft, classType }) => {
    return (
        <div className="flight-info">
            <div className="airport-code">{airportCode}</div>
            <div className="airport-name">{airportName}</div>
            <div className="flight-time">{time}</div>
            <div className="flight-duration">{stops}</div>
            <div className="flight-date">{date}</div>
            <div className="flight-airline">{airline}</div>
            <div className="flight-aircraft">{aircraft}</div>
            <div className="flight-class">{classType}</div>
        </div>
    );
};

export default FlightInfo;
