import React from "react";
import { useState, useEffect, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function EditStall() {
    const [stallName, setStallName] = useState("");
    const [image, setImage] = useState("");
    const [AddressLine1, setAddressLine1] = useState("");
    const [AddressLine2, setAddressLine2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [AmIOpen, setAmIOpen] = useState(null);
    const navigate = useNavigate()

    const [fetchState, setFetchState] = useState("loading");
    const [hawker, setHawker] = useState([]);
    const isSubscribed = useRef(true);

    const { id } = useParams()

    //get the hawker to work on
    useEffect(() => {
        const fetchHawker = async () => {
            const URL = `/api/hawkers/${id}`;
            try {
                setFetchState("loading");
                const data = await axios.get(URL);
                console.log("data", data.data);
                if (!isSubscribed) {
                    console.log("notSubbed");
                    return null;
                }
                setHawker(data.data);
                setStallName(data.data.Name);
                setImage(data.data.Image);
                setAddressLine1(data.data.AddressLine1);
                setAddressLine2(data.data.AddressLine2);
                setPostcode(data.data.Postcode);
                setOpeningTime(data.data.OpeningTime);
                setClosingTime(data.data.ClosingTime);
                setAmIOpen(data.data.AmIOpen);
                setFetchState("complete");
            }
            catch (error) {
                setFetchState("error");
                console.log("error situation", error);
                // navigate("/Hawkers");
            }
        }
        fetchHawker();
        return () => {
            isSubscribed.current = false;
        }
    }, []);


    const typeStallName = (event) => {
        setStallName(event.target.value);
    };
    const typeImage = (event) => {
        setImage(event.target.value);
    };
    const typeAddressLine1 = (event) => {
        setAddressLine1(event.target.value);
    };
    const typeAddressLine2 = (event) => {
        setAddressLine2(event.target.value);
    };
    const typePostcode = (event) => {
        setPostcode(event.target.value);
    };
    const typeOpeningTime = (event) => {
        setOpeningTime(event.target.value);
    };
    const typeClosingTime = (event) => {
        setClosingTime(event.target.value);
    };
    const typeAmIOpen = () => {
        setAmIOpen(!AmIOpen);
    };

    const openorclose = () => {
        if(AmIOpen === true){
            return("Close the store");
        }else{
            return("Open the store");
        }
    }

    const openOrCloseLabel = () => {
        if(AmIOpen === true){
            return("Currently Open");
        }else{
            return("Currently Closed");
        }
    }

    const editHawker = async (Name, Image, AddressLine1, AddressLine2, Postcode, OpeningTime, ClosingTime, AmIOpen) => {
        const response = await fetch(`/api/hawkers/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name,
                Image,
                AddressLine1,
                AddressLine2,
                Postcode,
                OpeningTime,
                ClosingTime,
                AmIOpen,
            }),
        });
        const data = await response.json();
        console.log(data);
        navigate("/Hawkers")
    };

    return (
        <div className="login-page">
            <Typography variant="h3">
                Edit stall
            </Typography>
            <NavLink to={"/Hawkers"}>
                <p>Back to Main Page</p>
            </NavLink>
            <div className="login">
                <form className="login-form">
                    <TextField
                        id="username"
                        name="username"
                        size="small"
                        autoComplete="off"
                        helperText="Name"
                        value={stallName}
                        onChange={typeStallName}
                    />
                    <TextField
                        id="image"
                        name="image"
                        size="small"
                        autoComplete="off"
                        helperText="Image URL"
                        value={image}
                        onChange={typeImage}
                    />
                    <TextField
                        id="AddressLine1"
                        name="AddressLine1"
                        size="small"
                        autoComplete="off"
                        helperText="Address Line 1"
                        value={AddressLine1}
                        onChange={typeAddressLine1}
                    />
                    <TextField
                        id="AddressLine2"
                        name="AddressLine2"
                        size="small"
                        autoComplete="off"
                        helperText="Address Line 2"
                        value={AddressLine2}
                        onChange={typeAddressLine2}
                    />
                    <TextField
                        id="postcode"
                        name="postcode"
                        size="small"
                        autoComplete="off"
                        helperText="Postcode"
                        value={postcode}
                        onChange={typePostcode}
                    />
                    <TextField
                        id="OpeningTime"
                        name="Opening Time"
                        size="small"
                        autoComplete="off"
                        helperText="Opening Time"
                        value={openingTime}
                        onChange={typeOpeningTime}
                    />
                    <TextField
                        id="ClosingTime"
                        name="Closing Time"
                        size="small"
                        autoComplete="off"
                        helperText="Closing Time"
                        value={closingTime}
                        onChange={typeClosingTime}
                    />
                    <label>{openOrCloseLabel()}</label>
                    <Button
                       defaultChecked={AmIOpen}
                        onClick={typeAmIOpen}
                        inputProps={{ 'aria-label': 'controlled' }}
                    >{openorclose()}</Button>

                    <Button onClick={() => editHawker(stallName, image, AddressLine1, AddressLine2, postcode, openingTime, closingTime, AmIOpen)}>Save Changes</Button>
                </form>
            </div>
        </div>
    );
}

export default EditStall;