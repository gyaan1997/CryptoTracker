import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner.avif)",
    width: "100%",
  },
  bannercontent: {
    paddingTop: 20,
    height: 400,
    display: "flex",
    flexDirection: "column",

    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    hight: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannercontent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            CryptoVerse
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "grey",
              textTransformation: "capitalize",
              fontFamily: "Monteserat",
            }}
          >
            Get information about your favourite Crypto Currency
          </Typography>
         
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
