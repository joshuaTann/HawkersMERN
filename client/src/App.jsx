import './App.css'
import Homepage from './GlobalComponents/Homepage';
import ShowStall from './GlobalComponents/ShowStall';
import NavigationBar from './NavigationBar/NavigationBar';
import About from './NavigationBar/About';
import Login from './UserComponents/Login';
import SignUp from './UserComponents/SignUp';
import AddStall from './GlobalComponents/AddStall';
import UserDashboard from './UserComponents/UserDashboard';
import EditStall from './GlobalComponents/EditStall';
import UserEdit from './UserComponents/UserEdit';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";
import { useState, createContext } from 'react';


export const DataContext = createContext();


function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <DataContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavigationBar />
          <Box sx={{ width: "90vw", margin: "auto" }}>
            <Routes>
              <Route path="/hawkers" element={<Homepage/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/hawkers/:id" element={<ShowStall />} />
              <Route path="/hawkers/:id/edit" element={<EditStall />} />
              <Route path="/hawkers/addstall" element={<AddStall />} />
              <Route path="/users/:id/" element={<UserDashboard />} />
              <Route path="/users/:id/edit" element={<UserEdit />} />
            </Routes>
          </Box>
        </BrowserRouter>
        </DataContext.Provider>
    </div>
  )
}

export default App
