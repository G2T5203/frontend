import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./homepage/HomePage";
import FlightSearch from "./flight-search/FlightSearch";
import SignIn from "./signin-screen/SignInPage";
import SignUp from "./signup-screen/SignUpPage";

// TODO: This should be made common later on. But wait till after Jared does his updates and makes the nav bar component.
import EditProfile from "./admin-portal/EditProfile";

// Admin Portal
import AdminPortalLogin from "./admin-portal/AdminPortalLogin";
import AdminPortalHomePage from "./admin-portal/AdminPortalHomePage";
import AdminPortalManagePlane from "./admin-portal/AdminManagePlane";
import AdminPortalEditPlane from "./admin-portal/AdminEditPlane";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/flightsearch" element={<FlightSearch />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* TODO: This should be moved out of admin pages and then made generic when you click on the profile icon on the header bar */}
        <Route path="/editprofile" element={<EditProfile />} />

        {/* ADMIN PORTAL */}
        <Route path="/adminPortal/home" element={<AdminPortalHomePage />} />
        <Route path="/adminPortal/login" element={<AdminPortalLogin />} />
        <Route path="/adminPortal/planes" element={<AdminPortalManagePlane />} />
        <Route path="/adminPortal/planes/edit" element={<AdminPortalEditPlane />} />
      </Routes>
    </Router>
  );
}

export default App;
