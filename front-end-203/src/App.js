import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./homepage/HomePage";
import FlightSearch from "./flight-search/FlightSearch";
import SignIn from "./signin-screen/SignInPage";
import SignUp from "./signup-screen/SignUpPage";

//Booking screens
import ConfirmationPage from "./6-confirmation/ComfirmationPage";


// Admin Portal
import AdminPortalLogin from "./admin-portal/AdminPortalLogin";
import AdminPortalHomePage from "./admin-portal/AdminPortalHomePage";
import AdminPortalEditProfile from "./admin-portal/AdminPortalEditProfile";
import AdminPortalManagePlane from "./admin-portal/AdminManagePlane";
import AdminPortalEditPlane from "./admin-portal/AdminEditPlane";
import AdminPortalManageRoute from "./admin-portal/AdminManageRoute";
import AdminPortalEditRoute from "./admin-portal/AdminEditRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/flightsearch" element={<FlightSearch />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Booking pages */}
        <Route path="/confirmation" element={<ConfirmationPage/>}/>

        {/* ADMIN PORTAL */}
        <Route path="/adminPortal/login" element={<AdminPortalLogin />} />
        <Route path="/adminPortal/home" element={<AdminPortalHomePage />} />
        <Route
          path="/adminPortal/editProfile"
          element={<AdminPortalEditProfile />}
        />
        <Route
          path="/adminPortal/planes"
          element={<AdminPortalManagePlane />}
        />
        <Route
          path="/adminPortal/planes/edit"
          element={<AdminPortalEditPlane />}
        />
        <Route
          path="/adminPortal/routes"
          element={<AdminPortalManageRoute />}
        />
        <Route
          path="/adminPortal/routes/edit"
          element={<AdminPortalEditRoute />}
        />
      </Routes>
    </Router>
  );
}

export default App;
