import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";

import { makeStyles } from "@material-ui/core";
import Error from './Pages/Coinpage';

import Homepage from "./Pages/Homepage"

import Coinpage from "./Pages/Coinpage"

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#16171a",
    color: "white",
    minHeight: "100vh",
    fontSize: "33",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />

          <Route path="*" element={<Error />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

