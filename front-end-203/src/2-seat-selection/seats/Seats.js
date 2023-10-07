import React, { useState } from "react";
import "./Seats.css";

const Seats = () => {
  const totalRows = 7;
  const seatsPerRow = 6;
  const aisleSeats = [3, 4];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prevSeats) => prevSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, seat]);
    }
  };

  return (
    <div className="plane-container">
      <div className="seat-container">
        {Array.from({ length: totalRows }, (_, rowIndex) => {
          const rowChar = String.fromCharCode(65 + rowIndex);
          return (
            <div className="row" key={rowChar}>
              {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const seatId = `${rowChar}${seatNumber}`;
                const isAisle = aisleSeats.includes(seatNumber);
                return (
                  <button
                    key={seatId}
                    className={`seat ${isAisle ? "aisle" : ""} ${
                      selectedSeats.includes(seatId) ? "selected" : ""
                    }`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {seatId}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seats;
