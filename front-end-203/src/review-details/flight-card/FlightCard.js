import React from 'react';
import FlightInfo from './FlightInfo';
import './FlightCard.css';

const FlightCard = ({ flightNumber, from, to, departure, arrival }) => {
    return (
        <div className="flight-card">
            <div className="flight-title">{flightNumber} - {from} to {to}</div>
            <FlightInfo {...departure} />
            <FlightInfo {...arrival} />
        </div>
    );
};

export default FlightCard;
