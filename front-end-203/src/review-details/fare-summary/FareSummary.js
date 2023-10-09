import React from 'react';
import './FareSummary.css';

const FareSummary = () => {
  const passengers = [
    {
      name: 'Brandon Hong',
      seatNumber: 'A1',
      price: 100
    },
    {
      name: 'Rayner Tan',
      seatNumber: 'A2',
      price: 200
    }
  ];

    //calculate the subtotal
  const subtotal = passengers.reduce((acc, passenger) => acc + passenger.price, 0);

  return (
    <div className="fare-summary">
      <h3>Fare</h3>
      <table>
        <thead>
          <tr>
            <th>Passengers' Name:</th>
            <th>Seat Number:</th>
            <th>Price:</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map(passenger => (
            <tr key={passenger.seatNumber}>
              <td>{passenger.name}</td>
              <td>{passenger.seatNumber}</td>
              <td>${passenger.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="subtotal">
        Subtotal: ${subtotal}
      </div>
    </div>
  );
}

export default FareSummary;
