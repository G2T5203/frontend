import React from 'react';
import PlaneSeat from './PlaneSeat';
import './Plane.css'; 

function PlaneRow({ rowNum, seats }) {
    return (
        <li className={`row row--${rowNum}`}>
            <ol className="seats" type="1">
                {seats.map((seat) => (
                    <PlaneSeat 
                        key={seat.id} 
                        seatId={seat.id} 
                        label={seat.label} 
                        disabled={seat.disabled} 
                    />
                ))}
            </ol>
        </li>
    );
}

function Plane() {
    const rows = [];

    for (let i = 1; i <= 7; i++) {
        let rowChar = String.fromCharCode(64 + i); // Start from 'A'

        let row = {
            rowNumber: i,
            seats: []
        };

        for (let j = 1; j <= 6; j++) {
            row.seats.push({
                id: `${rowChar}${j}`,
                label: `${rowChar}${j}`,
                disabled: false // Modify this as per occupancy
            });
        }

        rows.push(row);
    }

    return (
        <div className="plane">
            <div className="cockpit">
                <h1>WingIt</h1>
            </div>
            <div className="wing left-wing"></div> {/* Left Wing */}
            <div className="exit exit--front fuselage"></div>
            <ol className="cabin fuselage">
                {rows.map((row, index) => (
                    <PlaneRow key={index} rowNum={index + 1} seats={row.seats} />
                ))}
            </ol>
            <div className="wing right-wing"></div> {/* Right Wing */}
            <div className="exit exit--back fuselage"></div>
        </div>
    );
}

export default Plane;
