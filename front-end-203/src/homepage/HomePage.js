import React from "react";
import TopArea from "./Top/TopArea";
import Album from "./MiddleAlbum/Album";
import Footer from "./Bottom/Footer";
import "./HomePage.css";
import NavigationBar from "../flight-search/nav-bar/NavigationBar";

const HomePage = () => {
  return (
    <>
      <NavigationBar/>
      <TopArea />
      <Album />
      <Footer />
    </>
  );
};

export default HomePage;
