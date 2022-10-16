import React from 'react'
import { Container, makeStyles } from "@material-ui/core";

const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:"url(./cryptobanner.jpg)"
    },
    bannercontent:{
        height:400,
        display:"flex",
        flexDirection:"coloumn",
        justifyContent:"space-around",
    }
}));


function Banner() {
    const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannercontent}></Container>
        </div>
  )
}

export default Banner