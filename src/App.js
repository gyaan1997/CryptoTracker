import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
// import { Suspense,lazy } from 'react';
import { makeStyles } from "@material-ui/core";
import Error from './Pages/Coinpage';
//Lazy loaded pages
// const Homepage=lazy(()=>import('./Pages/Homepage'))
import Homepage from "./Pages/Homepage"
// const Coinpage=lazy(()=>import('./Pages/Coinpage'))
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
           {/* <Suspense fallback={<div>Loading...</div>}> */}
           <Route path="/" element={<Homepage />} />
           <Route path="/coins/:id" element={<Coinpage />} />
           {/* </Suspense> */}
          <Route path="*" element={<Error />} />
       
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

