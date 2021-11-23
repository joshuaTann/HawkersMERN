import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import { textAlign } from "@mui/system";

function NavigationBar() {

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

    // const loggedInButtons = [
    //     <>
    //       <NavLink to="/notifications" style={{ textDecoration: "none" }}>
    //         <Button sx={{ color: "white" }}>Notifications</Button>
    //       </NavLink>
    //       <NavLink to={`/users/${user._id}`} style={{ textDecoration: "none" }}>
    //         <div className="rowStyle">
    //         <Button sx={{ color: "white" }}>My Account</Button>
    //         <Avatar alt="user_avatar" src={`${user.display_picture}`} />
    //         </div>
    //       </NavLink>
    //       <NavLink to="/login" style={{ textDecoration: "none" }}>
    //         <Button sx={{ color: "white" }} onClick={handleLogout}>
    //           Log Out
    //         </Button>
    //       </NavLink>
    //     </>,
    //   ];

    return (
        <>
            <AppBar position="static">
                <Box sx={{ justifyContent: 'flex-start' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" >
                            <NavLink to="/hawkers" style={{ textDecoration: "none" }}>
                                <Button sx={{ color: "white" }}>Home</Button>
                            </NavLink>
                        </Typography>
                        <NavLink to="/about" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "white" }}>About</Button>
                        </NavLink>
                        <NavLink to="/hawkers/addstall/" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "white" }}>Add Stall</Button>
                        </NavLink>
                        <NavLink to="/hawkers/userdash/" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "white" }}>My Account</Button>
                        </NavLink>
                        <Typography variant="h6" component="div">
                            {loggedOutButtons}
                        </Typography>
                    </Toolbar>
                </Box>
            </AppBar>
        </>
    );
}

export default NavigationBar