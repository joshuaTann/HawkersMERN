import React from "react";
import { useState, useContext } from "react";
import { Typography, TextField, Button, Checkbox } from "@mui/material";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { DataContext } from "../App";


function AddStall() {
    const { user } = useContext(DataContext);

    const [stallName, setStallName] = useState("");
    const [image, setImage] = useState("");
    const [AddressLine1, setAddressLine1] = useState("");
    const [AddressLine2, setAddressLine2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const AmIOpen = true
    const owner = user._id
    const navigate = useNavigate()

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

    if (!!user._id === false) {
        return <Navigate to={"/login"} />
    }

    const addHawker = async (Name, Image, AddressLine1, AddressLine2, Postcode, OpeningTime, ClosingTime, AmIOpen, owner) => {
        try{
        const response = await fetch(`/api/hawkers/new/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                owner,
            }),
        });
        const data = await response.json();
        console.log(data);
    } finally {
        navigate("/hawkers")
    }
    };



    return (
        <div className="login-page">
            <Typography variant="h3">
                Add a stall
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
                        placeholder="Set Stall Name"
                        onChange={typeStallName}
                    />
                    <TextField
                        id="image"
                        name="image"
                        size="small"
                        autoComplete="off"
                        placeholder="Image Link"
                        onChange={typeImage}
                    />
                    <TextField
                        id="AddressLine1"
                        name="AddressLine1"
                        size="small"
                        autoComplete="off"
                        placeholder="Address Line #1"
                        onChange={typeAddressLine1}
                    />
                    <TextField
                        id="AddressLine2"
                        name="AddressLine2"
                        size="small"
                        autoComplete="off"
                        placeholder="Address Line #2"
                        onChange={typeAddressLine2}
                    />
                    <TextField
                        id="postcode"
                        name="postcode"
                        size="small"
                        autoComplete="off"
                        placeholder="Postcode"
                        onChange={typePostcode}
                    />
                    <TextField
                        id="OpeningTime"
                        name="Opening Time"
                        size="small"
                        autoComplete="off"
                        placeholder="Opening Time"
                        onChange={typeOpeningTime}
                    />
                    <TextField
                        id="ClosingTime"
                        name="Closing Time"
                        size="small"
                        autoComplete="off"
                        placeholder="Closing Time"
                        onChange={typeClosingTime}
                    />
                    <Button onClick={() => addHawker(stallName, image, AddressLine1, AddressLine2, postcode, openingTime, closingTime, AmIOpen, owner)}>Add stall</Button>
                </form>
            </div>
        </div>
    );
}

export default AddStall;