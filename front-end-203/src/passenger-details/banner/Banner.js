// Banner.js
import React from 'react';
import {Typography} from '@mui/material';


const Banner = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '50vh', // 1/4th of the viewport height
        width: '100vw',// 100% of the viewport width
        background: `url('https://media.npr.org/assets/img/2021/10/06/gettyimages-1302813215_wide-6c48e5a6aff547d2703693450c4805978de47435.jpg')`, // Replace with your image URL
        backgroundSize: 'cover', // Scale the image to cover the entire container
        backgroundPosition: 'center' // Center the image
      }}
    >
      <div 
        className="text"
        style={{
          position: 'absolute', // this positions the text within the banner
          bottom: 10, // this places it 10px from the bottom of the banner
          width: '100%', // ensures it spans the width of the container
          textAlign: 'left', // centers the text horizontally
          boxSizing: 'border-box' // ensures padding is included in total height
        }}
      >
        <Typography
          variant="h4"
          style={{
            fontFamily: "Merriweather, sans-serif",
            fontWeight: "bold",
            color: "white",
          }}>
          Passenger Details
        </Typography>
      </div>
      {/* You can add content or additional components inside this div if needed */}
    </div>
  );
};

export default Banner;
