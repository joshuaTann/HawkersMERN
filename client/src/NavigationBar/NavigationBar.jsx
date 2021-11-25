import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Avatar, MenuItem } from "@mui/material";
import { textAlign } from "@mui/system";
import { useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";

function NavigationBar() {

    const URL = "/api/sessions";
    const { user, setUser } = useContext(DataContext);

    const handleLogout = async () => {
        const res = await axios.delete(URL);
        const data = res.data;
        console.log("Server returns this when logging out: ", data);
        setUser({});
    };

    const loggedOutButtons = [
        <>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Login</Button>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }}>Sign Up</Button>
            </NavLink>
        </>,
    ];

    const loggedInButtons = [
        <>
            <NavLink to={`/users/${user._id}/`} style={{ textDecoration: "none" }}>
                <div className="keepInline">
                    <Button sx={{ color: "white" }}>My Account</Button>
                    <Avatar alt="user_avatar" src={`${user.display_picture}`} />
                </div>
            </NavLink>

            <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white" }} onClick={handleLogout}>
                    Log Out
                </Button>
            </NavLink>
        </>,
    ];

    const areweloggedin = () => {
        if (!!user._id === true) {
            return (loggedInButtons);
        } else {
            return (loggedOutButtons)
        }
    }

    const areweahawker = () => {
        if (user.is_hawker === true) {
            return (
                <NavLink to="/hawkers/addstall/" style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "white" }}>Add Stall</Button>
                </NavLink>

            );
        }
    }



    return (
        <>
            <AppBar position="static">
                <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
                    <div>
                        <MenuItem edge="start">
                            <Typography variant="h6" component="div" >
                                <NavLink to="/hawkers" style={{ textDecoration: "none" }}>
                                    <Button sx={{ color: "white" }}>Home</Button>
                                </NavLink>
                            </Typography>
                            <NavLink to="/about" style={{ textDecoration: "none" }}>
                                <Button sx={{ color: "white" }}>About</Button>
                            </NavLink>
                        </MenuItem>
                    </div>
                    <div>
                        <MenuItem>
                            <Typography variant="h6" component="div">
                                {areweahawker()}
                            </Typography>
                            {/* <Typography variant="h6" component="div"> */}
                            {areweloggedin()}
                            {/* </Typography> */}
                        </MenuItem>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavigationBar