import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useState, useContext } from "react";
import { DataContext } from "../App";
import axios from "axios";

import "../App.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  const URL = "/api/sessions/new";

  const [name, setName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();

  const typeUsername = (event) => {
    setName(event.target.value);
  };
  const typePassword = (event) => {
    setInputPassword(event.target.value);
  };

  // log in
  const logIn = async (event) => {
    event.preventDefault();
    // check if username and password inserted is purposely
    // or accidentally left empty by user.
    const loginDetails = {
      username: !!name ? name : null,
      password: !!inputPassword ? inputPassword : null,
    };

    // find user at backend
    const res = await axios.post(URL, loginDetails);
    const data = res.data;
    console.log("Server returns this: ", data);

    if (data === "wrong") {
      alert("Incorrect username or password");
    } else {
      setUser(data);
      navigate("/hawkers");
    }
  };

  // mui related.
  const wordStyle = {
    color: "primary.main",
  };

  // RENDER
  if (!!user?._id === true) {
    return <div>{`${user?.username} is currently signed in!`}</div>;
  }

  return (
    <div className="login-page">
      <Typography variant="h3" sx={{ ...wordStyle }}>
        Login
      </Typography>
      <NavLink to={"/hawkers"}>
        <p>Back to Main Page</p>
      </NavLink>
      <div className="login">
        <form className="login-form" onSubmit={logIn}>
          <TextField
            name="username"
            size="small"
            placeholder="Insert Username"
            onChange={typeUsername}
          />
          <br/>
          <TextField
            name="password"
            size="small"
            placeholder="Insert Password"
            onChange={typePassword}
          />
          <br/>
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;