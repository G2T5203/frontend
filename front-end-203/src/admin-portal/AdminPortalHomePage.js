import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Typography, Grid, Box, Button, Paper, Container } from "@mui/material";
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
            <Paper sx={{
                p: 1,
                m: 1
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                alignItems: 'center',
            }}>
                <Box>
                    <Typography variant="h3">Welcome {currentUser != null ? currentUser.username : ""}</Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="secondary" onClick={onLogout}>Logout</Button>
                </Box>
            </Box>
            </Paper>


            <Grid container xs={12}>
                <Grid item xs={12} sm={8} style={{
                    padding: 10,
                }}>
                    <Paper elevation={3} style={{
                        padding: 20,
                    }}>
                        <div>
                        <Typography variant="h4">ALL USERS</Typography>
                        <br/>
                            {allUsers.length > 0 ? (
                                allUsers.map(item => (
                                    <Button fullWidth key={item.username} elevation={3} variant="contained"
                                    color={item.authorityRole === "ROLE_ADMIN" ? "warning" : "primary"}
                                    onClick={() => {console.log("TODO: navigate to edit profile page...")}}
                                    style={{margin: 10, padding: 10, borderRadius: 8,}}>
                                        {item.salutation}. {item.firstName} {item.lastName}
                                        <br />
                                        Username: {item.username}
                                        <br />
                                        {item.email}
                                        <br />
                                        Phone: {item.phone}
                                    </Button>
                                ))
                            ) : (
                                <Typography variant="body">Loading... something might have went wrong (check console)</Typography>
                            )}
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4} style={{
                    padding: 10
                }}>
                    <Paper elevation={3}>
                        <Box columnGap={2} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                            alignItems: 'center',
                        }}>
                            <Button fullWidth variant="contained" onClick={() => { navigate("/adminPortal/planes") }}
                            style={{margin: 10}}>Manage Planes</Button>

                            <Button fullWidth variant="contained" onClick={() => { navigate("/adminPortal/routes") }}
                            style={{margin: 10}}>Manage Routes</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminPortalHomePage;
