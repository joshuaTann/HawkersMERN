import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography, Grid } from "@mui/material";
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';




function Homepage() {

    const [fetchState, setFetchState] = useState("loading");
    const [hawkers, setHawkers] = useState([]);
    const isSubscribed = useRef(true);
    const navigate = useNavigate();

    const { user } = useContext(DataContext);

    //get the list of hawkers
    useEffect(() => {
        const fetchAllHawkers = async () => {
            const URL = `/api/hawkers/`;
            try {
                setFetchState("loading");
                const data = await axios.get(URL);
                console.log("data", data.data);
                if (!isSubscribed) {
                    console.log("subscription cancelled because of component unmount");
                    return null;
                }
                setHawkers(data.data);
                setFetchState("complete");
            }
            catch (error) {
                setFetchState("error");
                console.log("error situation", error);
                navigate("/hawkers");
            }
        }
        fetchAllHawkers();
        return () => {
            isSubscribed.current = false;
        }
    }, []);

    console.log(hawkers)

    
    const hawkersArrRender = hawkers?.map((eachHawker, i) => {
        const Openornot = () => {
            if (eachHawker.AmIOpen === true) {
                return ("I am open today")
            } else {
                return ("I am closed today")
            }
        }
        
        const addToFaves = async () => {
            const response = await fetch(`/api/users/${user._id}/${eachHawker._id}`, {
                method: "PUT"
            });
        }

        return (
            <Grid item sm={4} key={i}>
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
                        <Link to={`/hawkers/${eachHawker._id}`}>
                            <Button>More</Button>
                        </Link>
                        <Button onClick={() => addToFaves()}>Add To Favourites</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    })

    return (
        <>
            <h1>Hawkers</h1>
            <Grid container spacing={2}>
                {hawkersArrRender}
            </Grid>
        </>
    )
}

export default Homepage