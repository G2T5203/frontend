import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Link from "@mui/material/Link";

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
            <Grid container
                alignItems="center"
                justifyContent="center"
                style={{
                    paddingTop: 80,
                    padding: 20,
                }}
            >
                <Grid item xs={10} md={10}>
                    <Typography variant="h3">Welcome {currentUser != null ? currentUser.username : ""}</Typography>
                </Grid>
                <Grid item xs={2} md={2} justify="flex end">
                    <Button variant="contained" color="secondary" onClick={onLogout}>Logout</Button>
                </Grid>
            </Grid>


            <Grid container justify="center" lg={10} xl={8}>
                <Grid item xs={6} md={6}
                    style={{
                        // backgroundColor: "#FF0000",
                        padding: 10,
                    }}
                >
                    <Paper elevation={3}
                        style={{
                            padding: 20,
                        }}
                    >
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
                    </Paper>

                </Grid>

                <Grid item xs={6} md={6}
                    style={{
                        // backgroundColor: "#00FF00",
                        padding: 10
                    }}>
                    <Paper elevation={3}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <Link component={Button} href="/adminPortal/planes">Manage Planes</Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link component={Button} href="/adminPortal/routes" style={{
                                    // backgroundColor: "#FF0000"
                                }}
                                >Manage Routes</Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminPortalHomePage;
