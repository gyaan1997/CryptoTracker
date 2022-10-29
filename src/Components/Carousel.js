import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { CryptoState } from "../CryptoContext";
import { TrendingCoins } from "../Configuration/Api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // carousel: {
  //   height: "50%",
  //   display: "flex",
  //   alignment: "center",
  // },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));
export function numbersWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');

}
function Carousel() {
  const [Trending, setTrending] = useState([]);
  const { currency ,symbol} = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  // console.log(Trending)
  const classes = useStyles();

  const items = Trending.map((coin) => {



    let profit=coin.price_change_percentage_24h >=0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span >{coin?.symbol}
        &nbsp;
        </span>
        <span 
        style={{
          color:profit>0?"rgb(14,203,129)":"red",
          fontWeight:500,
        }}
        >{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}% </span>
      <span>{symbol} {numbersWithCommas(coin?.current_price.toFixed(2))}</span>
      </Link>
    );
  });

  return (
    // <div className={classes.carousel}>Carousel</div>

    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      //  responsive={responsive}
      autoPlay
      items={items}
    />
  );
}

export default Carousel;
