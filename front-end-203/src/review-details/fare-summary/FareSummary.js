import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import './FareSummary.css'
import { useNavigate } from "react-router-dom";
import { isAuthenticated, removeAuthToken, updateAuthHeadersFromCurrentUser } from '../../auth';

const FareSummary = ({ passengers, tripType, bookingId }) => {

    const [totalChargedPrice, setTotalChargedPrice] = useState(0);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    //authentication + api call
  useEffect(() => {
    if (isAuthenticated()) {
      axios
          .get(apiUrl + "users/authTest")
          .then((response) => {
            // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
            if (response.status === 200) {
              updateAuthHeadersFromCurrentUser();
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
            } else {
              removeAuthToken();
              navigate("/signin");
              console.log("made an error at flightSearch 51")
            }
          })
          .catch((error) => {
            removeAuthToken();
            navigate("/signin");
            console.log(error);
          });
    } else {
      navigate("/signin");
        console.log("made an error at flightSearch 61")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // previous useeffect code for reference
    // useEffect(() => {
    //     const fetchChargedPrice = async () => {
    //         try {
    //             const url1 = apiUrl + `bookings/calculateChargedPrice/${bookingId}`; 
    //             const response = await axios.put(url1);
    //             setTotalChargedPrice(response.data.totalChargedPrice);
    //             console.log('Response from backend:', response.data);

    //         } catch (error) {
    //             console.error("Failed to fetch charged price:", error);
    //         }
    //     };

    //     fetchChargedPrice();
    // }, []);

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
