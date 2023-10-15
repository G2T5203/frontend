import React from 'react';
import './FareSummary.css'

const FareSummary = ({ passengers, tripType }) => {

    //just using fixed price for now
    const fixedFare = 100;

    // Calculate the total fare
    const totalFare = Array.isArray(passengers) ? passengers.length * fixedFare : 0;

    return (
      <div className="fare-summary">
          <h3>Fare Summary</h3>
          
          <table>
              <thead>
                  <tr>
                      <th>Passengers' Name:</th>
                      <th>Seat Number:</th>
                      <th>Price:</th>
                  </tr>
              </thead>
              <tbody>
                  {Array.isArray(passengers) && passengers.map((passenger, index) => (
                      <tr key={index}>
                          <td>{`${passenger.salutation} ${passenger.firstName} ${passenger.lastName}`}</td>
                          <td>
                              {`Outbound: ${passenger.outboundSeat}`}
                              {tripType === "Return" && `, Return: ${passenger.returnSeat}`}
                          </td>
                          <td>{`$${fixedFare}`}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
  
          <div className="subtotal">
              <strong>Total Fare: </strong>${totalFare}
          </div>
      </div>
  );
  
}

export default FareSummary;
