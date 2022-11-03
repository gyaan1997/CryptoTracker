import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectbuttons: {
    border: "1px solid gold",
    marginTop: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Monteserrat",
    cursor: "pointer",
    "&:hover":{
      backgroundColor:"gold",
      color:"black"
    },
    width:"20%",
  },
});
function SelectButton({ children, onClick, selected }) {
  const classes = useStyles(selected);
  return (
    <span
      onClick={onClick}
     style={{backgroundColor: selected ? "gold" : "",
    color:selected?"black":"",
    fontWeight:selected?700:500,

    }}
      className={classes.selectbuttons}
    >
      {children}
    </span>
  );
}

export default SelectButton;
