import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";
import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles(()=>({
    App:{
    backgroundColor:"#5A5A5A",
      color:"white",
      minHeight:"100vh",
      fontSize:"33",
    }
  }))

function App() {

  
  const classes=useStyles()
  return (
    <BrowserRouter>
    <div className={classes.App}>
    <Header />
      <Routes>
      
        <Route path="/" element={<Homepage />} />
        <Route path="/coins" element={<Coinpage />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
