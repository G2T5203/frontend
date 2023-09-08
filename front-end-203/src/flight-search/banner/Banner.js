// Banner.js
import React from 'react';

const Banner = () => {
  return (
    <div
      style={{
        height: '50vh', // 1/4th of the viewport height
        width: '100%', // 100% of the viewport width
        background: `url('https://c4.wallpaperflare.com/wallpaper/598/1016/990/sunset-orange-airplane-airplane-wing-wallpaper-preview.jpg')`, // Replace with your image URL
        backgroundSize: 'cover', // Scale the image to cover the entire container
        backgroundPosition: 'center', // Center the image
      }}
    >
      {/* You can add content or additional components inside this div if needed */}
    </div>
  );
};

export default Banner;
