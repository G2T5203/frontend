import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Paper, Container } from "@mui/material";
import { setAuthToken, getCurrentUser, getUserByUsernameAndEmail, getAllCookies, isAuthenticated, removeAuthToken, updateAuthTokenFromCurrentUser } from "../auth";

const AdminPortalHomePage = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [allUsers, setAllUsers] = useState([]);

    // Calls immediately upon page load
    useEffect(() => {
        if (currentUser != null) {
            // This one works. We probably just have to set this value to the ORIGINAL jwtResponse.data then it can work.
            // To test this, just get your adminAuth token from postman and copy paste into here below.
            // So this line in setAuthToken needs to be debugged.
            // axios.defaults.headers.common["Authorization"] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTY5NTM1MzkwMSwiaWF0IjoxNjk1MzUwMzAxfQ.s9dZEItSGOEHnNAK1tq1uo7my1EjImnC5ktCHOirIk57sW1_mcUrWTeOfH0bfgDCR4VMCA7iPSQbIkl39Y2MJw`;
            
            // The updateAuthTokenFromCurrentUser() throws an error.
            // updateAuthTokenFromCurrentUser();
            GetAllUsers();
        } else {
            navigate('/adminPortal/login');
        }
    }, []);
    
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const onLogout = () => {
        console.log("LOGOUT");
        removeAuthToken();
        navigate('/adminPortal/login');
    }

    return (
        <Container>
            <div className="Header">
                <h2>Welcome {currentUser != null ? currentUser.username : ""}</h2>
                <Button onClick={onLogout}>Logout</Button>
            </div>
            <div className="All-Users-Display">
                <div>
                    <h1>All Users</h1>
                    {allUsers.length > 0 ? (
                        allUsers.map(item => (
                            <div key={item.username}>
                                {item.salutation} {item.firstName} {item.lastName} ({item.authorityRoles})
                                <br />
                                {item.username}
                                {item.email}
                                <br />
                                <br />
                            </div>
                        ))
                    ) : (
                        <p>Loading... something might have went wrong (check console)</p>
                    )}
                </div>
            </div>
        </Container>
    );

    function GetAllUsers() {
        axios.get(apiUrl + "users")
            .then((response) => {
                console.log(response.status)
                console.log(response.data)
                // If the call fails, a html to the login page is sent back.
                const isResponseJsonType = response.headers.get('content-type')?.includes('application/json');
                if (response.data != null && isResponseJsonType) {
                    setAllUsers(response.data)
                } else {
                    setAllUsers([])
                }
            })
            .catch((error) => {
                console.log(error);
                setAllUsers([]);
            })
    }
};

export default AdminPortalHomePage;
