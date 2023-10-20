import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import './FareSummary.css'

const FareSummary = ({ passengers, tripType, bookingId }) => {

    const [totalChargedPrice, setTotalChargedPrice] = useState(0);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchChargedPrice = async () => {
            try {
                const url1 = apiUrl + `bookings/calculateChargedPrice/${bookingId}`; 
                const response = await axios.put(url1);
                setTotalChargedPrice(response.data.totalChargedPrice);
                console.log('Response from backend:', response.data);

            } catch (error) {
                console.error("Failed to fetch charged price:", error);
            }
        };

        fetchChargedPrice();
    }, []);

    console.log('Total Charged Price:', totalChargedPrice);



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
                          <td>{`$${(totalChargedPrice.toFixed(2))}`}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
  
          <div className="subtotal">
              <strong>Total Fare: </strong>${totalChargedPrice.toFixed(2)}
          </div>
      </div>
  );
  
}

export default FareSummary;
