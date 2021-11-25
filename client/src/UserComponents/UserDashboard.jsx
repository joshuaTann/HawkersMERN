import React from "react";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../App";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography, Grid, Avatar } from "@mui/material";
import { NavLink, Navigate } from 'react-router-dom';
import axios from "axios";

function UserDashboard() {
    const { user } = useContext(DataContext);
    const [fetchState, setFetchState] = useState("loading");
    const [thisUser, setThisUser] = useState([]);
    const [userStalls, setUserStalls] = useState([]);
    const [userFaves, setUserFaves] = useState([]);

    if (!!user._id === false) {
        return <Navigate to={"/login"} />
    }

    const userURL = `/api/users/${user._id}`;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(userURL);
            // console.log(res.data);
            setThisUser(res.data);
            setUserStalls(res.data.stalls);
            setUserFaves(res.data.favourites)
            setFetchState("complete");
        };
        fetchUser();
    }, []);

    const stallsArrRender = userStalls?.map((eachHawker, i) => {
        const Openornot = () => {
            if (eachHawker.AmIOpen === true) {
                return ("I am open today")
            } else {
                return ("I am closed today")
            }
        }

        const deleteStall = async () => {
            const response = await fetch(`/api/hawkers/${eachHawker._id}`, {
                method: "DELETE"
            });
            setUserStalls(userStalls.filter((h) => h._id !== eachHawker._id));
        }

        return (
            <Grid item xs={4} key={i}>
                <Card>
                    <CardMedia
                        component="img"
                        height="140px"
                        image={eachHawker.Image[0]}
                        alt="Picture of Food"
                    />
                    <CardContent>
                        <h1>{eachHawker.Name}</h1>
                        <div>{eachHawker.AddressLine1}</div>
                        <div>{eachHawker.AddressLine2}</div>
                        <div><strong>{Openornot()}</strong></div>
                        <div>Regular hours:</div>
                        <div>{eachHawker.OpeningTime} to {eachHawker.ClosingTime}</div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => deleteStall()}>Delete</Button>
                        <NavLink to={`/Hawkers/${eachHawker._id}/edit/`}>
                            <Button>Edit</Button>
                        </NavLink>
                    </CardActions>
                </Card>
            </Grid>
        )
    })

    const favesArrRender = userFaves?.map((eachHawker, i) => {
        const Openornot = () => {
            if (eachHawker.AmIOpen === true) {
                return ("I am open today")
            } else {
                return ("I am closed today")
            }
        }

        const removeFromFaves = async () => {
            const response = await fetch(`/api/users/${user._id}/${eachHawker._id}`, {
                method: "DELETE"
            });
            setUserFaves(userFaves.filter((h) => h._id !== eachHawker._id));
        }

        return (
            <Grid item xs={4} key={i}>
                <Card>
                    <CardMedia
                        component="img"
                        height="140px"
                        image={eachHawker.Image[0]}
                        alt="Picture of Food"
                    />
                    <CardContent>
                        <h1>{eachHawker.Name}</h1>
                        <div>{eachHawker.AddressLine1}</div>
                        <div>{eachHawker.AddressLine2}</div>
                        <div><strong>{Openornot()}</strong></div>
                        <div>Regular hours:</div>
                        <div>{eachHawker.OpeningTime} to {eachHawker.ClosingTime}</div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => removeFromFaves()}>Remove from favourites</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    })

    const showHawkerStalls = () => {
        if (user.is_hawker === true) {
            return (
                <Grid item container>
                    <Grid item>
                        <Typography variant="h5">
                            <strong>My Stalls:</strong>
                        </Typography>
                    </Grid>
                    <Grid item container spacing={3}>
                        {stallsArrRender}
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <>
            <Grid item xs={2}>
                <Avatar alt="user_avatar" src={`${thisUser.display_picture}`} variant="square" sx={{ width: 200, height: 200, borderRadius: 10, m: 2, alignItems: "center" }} />
                <Grid item><strong>{thisUser.displayname}</strong></Grid>
                <NavLink to={`/users/${user._id}/edit`}>
                    <Button>Edit Profile</Button>
                </NavLink>
            </Grid>
            <h1>Dashboard</h1>
            <Grid container spacing={2}>
                {showHawkerStalls()}
                <Grid item container >
                    <Grid item>
                        <Typography variant="h5">
                            <strong>My Favourites:</strong>
                        </Typography>
                    </Grid>
                    <Grid item container spacing={3}>
                        {favesArrRender}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default UserDashboard