import { useContext, useState, useEffect} from "react";
import { DataContext } from "../App";
import { Typography, TextField, Button, Avatar } from "@mui/material";
import { NavLink, useNavigate, Navigate } from "react-router-dom";

function UserEdit() {
    const { user, setUser } = useContext(DataContext);

    const[username, setUsername] = useState("")
    const[displayname, setDisplayname] = useState("")
    const[password, setPassword] = useState("")
    const[display_picture, setDisplay_picture] = useState("")
    const navigate = useNavigate()

useEffect(() => {
    setUsername(user.username);
    setDisplayname(user.displayname);
    setPassword(user.password);
    setDisplay_picture(user.display_picture);
}, []);

if (!!user._id === false) {
    return <Navigate to={"/login"} />
}


const typeUsername = (event) => {
    setUsername(event.target.value);
};
const typeDisplayname = (event) => {
    setDisplayname(event.target.value);
};
const typePassword = (event) => {
    setPassword(event.target.value);
};
const typeDisplay_picture = (event) => {
    setDisplay_picture(event.target.value);
};

const editUser = async (username, displayname, password, display_picture) => {
    const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            displayname,
            password,
            display_picture,
        }),
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
    navigate(`/users/${user?._id}`)
};



return (
    <div className="login-page">
        <Avatar alt="user_avatar" src={`${user.display_picture}`} variant="square" sx={{ width: 200, height: 200, borderRadius: 10, m: 2, textAlign: "center" }} />
        <Typography variant="h3">
            Edit User
        </Typography>

        <NavLink to={`/users/${user._id}`}>
            <p>Back</p>
        </NavLink>
        <div>
            <form>
                <TextField
                    id="username"
                    name="username"
                    size="small"
                    autoComplete="off"
                    helperText="username"
                    value={username}
                    onChange={typeUsername}
                />
                <TextField
                    id="displayname"
                    name="displayname"
                    size="small"
                    autoComplete="off"
                    helperText="Display Name"
                    value={displayname}
                    onChange={typeDisplayname}
                />
                <TextField
                    id="password"
                    name="password"
                    size="small"
                    autoComplete="off"
                    helperText="password"
                    value={password}
                    onChange={typePassword}
                />
                <TextField
                    id="displayimage"
                    name="displayimage"
                    size="small"
                    autoComplete="off"
                    helperText="Profile Picture"
                    value={display_picture}
                    onChange={typeDisplay_picture}
                />
                <Button onClick={() => editUser(username, displayname, password, display_picture)}>Save Changes</Button>
            </form>
        </div>
    </div>
);


}

export default UserEdit