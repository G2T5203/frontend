import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Paper, Container } from "@mui/material";
import { setAuthToken, getCurrentUser, getUserByUsernameAndEmail, getAllCookies, isAuthenticated, removeAuthToken } from "../auth";

const AdminPortalHomePage = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [allUsers, setAllUsers] = useState([]);

    // Calls immediately upon page load
    useEffect(() => {
        GetAllUsers();
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
                <h2>Welcome {currentUser.username}</h2>
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
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </Container>
    );

    function GetAllUsers() {
        axios.get(apiUrl + "users",
            {
                auth: {
                    username: "admin",
                    password: "pass",
                }
            })
            .then((response) => {
                console.log(response.status)
                console.log(response.data)
                console.log(response.data.body)
                setAllUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

export default AdminPortalHomePage;
