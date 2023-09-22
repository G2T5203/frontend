import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./homepage/HomePage";
import FlightSearch from "./flight-search/FlightSearch";
import SignIn from "./signin-screen/SignInPage";
import SignUp from "./signup-screen/SignUpPage";
import EditProfile from "./admin-portal/EditProfile";
import PlaneAdd from "./admin-portal/AdminManagePlane";

// Admin Portal
import AdminPortalLogin from "./admin-portal/AdminPortalLogin";
import AdminPortalHomePage from "./admin-portal/AdminPortalHomePage";

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
        <Route path="/adminPortal/planes" element={<PlaneAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
