import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button, Container } from "@mui/material";
import { getCurrentUser, removeAuthToken, updateAuthHeadersFromCurrentUser } from "../auth";

const AdminPortalHomePage = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [allUsers, setAllUsers] = useState([]);

    // Calls immediately upon page load
    useEffect(() => {
        if (currentUser != null) {
            updateAuthHeadersFromCurrentUser();
            GetAllUsers();
        } else {
            navigate('/adminPortal/login');
        }
    });
    
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
