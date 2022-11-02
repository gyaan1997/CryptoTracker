import React from "react";
import { makeStyles } from "@material-ui/core";


function SelectButton({ children, onClick, selected }) {
  const useStyles = makeStyles({
    selectbuttons: {
      border:"1px solid gold",
      marginTop:20,
      padding:10,
      fontFamily:"Monteserrat",
    },
  });
  const classes = useStyles();
  return (
    <span onClick={onClick} classname={classes.selectbuttons}>
      {children}
    </span>
  );
}

export default SelectButton;
