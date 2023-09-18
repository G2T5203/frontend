import React from "react";
import TopArea from "./Top/TopArea";
import Album from "./MiddleAlbum/Album";
import Footer from "./Bottom/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <TopArea />
      <Album />
      <Footer />
    </>
  );
};

export default HomePage;
