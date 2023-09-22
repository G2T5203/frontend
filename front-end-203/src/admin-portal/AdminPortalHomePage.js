import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Link from "@mui/material/Link";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Grid, Box, Button, Paper, Container } from "@mui/material";
import { isAuthenticated, getCurrentUser, removeAuthToken, updateAuthHeadersFromCurrentUser } from "../auth";

const AdminPortalHomePage = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const [allUsers, setAllUsers] = useState([]);


    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const onLogout = () => {
        console.log("LOGOUT");
        removeAuthToken();
        navigate('/adminPortal/login');
    }

    function GetAllUsers() {
        axios.get(apiUrl + "users")
            .then((response) => {
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


    // Calls immediately upon page load
    useEffect(() => {
        if (isAuthenticated()) {
            axios.get(apiUrl + "users/adminAuthTest").then((response) => {
                // TODO: This isn't correctly reporting errors. Postman is 403, but here it's still 200.
                if (response.status === 200) {
                    updateAuthHeadersFromCurrentUser();
                    GetAllUsers();
                } else {
                    removeAuthToken();
                    navigate('/adminPortal/login');
                }
            }).catch((error) => {
                removeAuthToken();
                navigate('/adminPortal/login');
            })
        } else {
            navigate('/adminPortal/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <Container>
            <Paper elevation={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 50,
                    margin: 30,
                }}
            >
                <AppBar position="static">
                    <Toolbar style={{ width: '900px' }}>
                        <h1>Welcome {currentUser != null ? currentUser.username : ""}</h1>
                        <Box flexGrow={1} />
                        <Button variant="contained" color="secondary" onClick={onLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>

                <Grid style={{
                    padding: 50,
                }}>
                    <Link component={Button} href="/adminPortal/planes">Manage Planes</Link>
                    <Link component={Button} href="/adminPortal/routes">Manage Routes</Link>
                </Grid>

                <div className="All-Users-Display">
                    <div>
                        <h1>All Users</h1>
                        {allUsers.length > 0 ? (
                            allUsers.map(item => (
                                <div key={item.username}>
                                    {item.salutation}. {item.firstName} {item.lastName}
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
            </Paper>
        </Container>
    );
};

export default AdminPortalHomePage;
