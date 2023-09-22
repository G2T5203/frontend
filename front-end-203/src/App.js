import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./homepage/HomePage";
import FlightSearch from "./flight-search/FlightSearch";
import SignIn from "./signin-screen/SignInPage";
import SignUp from "./signup-screen/SignUpPage";
import EditProfile from "./adminPortal/EditProfile";
import PlaneAdd from "./adminPortal/PlaneAdd";

// Admin Portal
import AdminPortalLogin from "./adminPortal/AdminPortalLogin";
import AdminPortalHomePage from "./adminPortal/AdminPortalHomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/flightsearch" element={<FlightSearch />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/planeadd" element={<PlaneAdd />} />

        {/* ADMIN PORTAL */}
        <Route path="/adminPortal/home" element={<AdminPortalHomePage />} />
        <Route path="/adminPortal/login" element={<AdminPortalLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
