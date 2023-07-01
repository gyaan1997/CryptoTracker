/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../Configuration/Api";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import {numbersWithCommas} from "../Components/Carousel";
import CoinInfo from './CoinInfo';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  heading: {
    fontFamily: "Monteserrat",
    fontWeight: "bold",
    marginBottom:20,
  },
  description: {
    width: "100%",
    fontFamily: "Monteserrat",
    padding: 25,
    paddingBottom: 15,
    paddingtop: 0,
    textAlign: "justify",
  },
  marketData:{
    alignSelf:"start",
    padding:25,
    PaddingTop:10,
    width:"100%",
    //To make it responsive
    [theme.breakpoints.down("md")]:{
      display:"flex",
      justifyContent:"space-around",
    },
    [theme.breakpoints.down("sm")]:{
      flexDirection:"column",
alignItems:"center"
    },
    [theme.breakpoints.down("xs")]:{
     alignItems:"start",
    },
  }
}));
const Coinpage = () => {
  const { id } = useParams(); //to retrieve route parameters from the component rendered by the matching route
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  // console.log(data);

  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const classes = useStyles();
  if(!coin) return<LinearProgress style={{backgroundColor:"gold"}}/>

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          width="200"

          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          <span>{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</span>
        </Typography>

        <div classname={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{symbol}{" "}{numbersWithCommas(coin?.market_data.current_price[currency.toString().toLowerCase()])}</Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
             Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{symbol}{" "}{numbersWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
          </span>
        </div>
      </div>

      {/*chart*/}
      <CoinInfo coin={coin}/>
    </div>
  );
};

export default Coinpage;
