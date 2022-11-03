import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../Configuration/Api";
import axios from "axios";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart,Line }            from 'react-chartjs-2'
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import SelectButton from "./SelectButton";

const chartDays=[
    {label:"24 Hours", value:1,},
    {label:"30 Days", value:30,},
    {label:"3 Months", value:90,},
    {label:"1 year", value:365,},
]
const useStyles = makeStyles(() => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
  },
}));

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState();
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };
  console.log(historicalData);

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
            data={{
                labels:historicalData.map((coin)=>{

                            let date=new Date(coin[0]);
                            let time=
                            date.getHours()>12
                            ?`${date.getHours()-12}:${date.getMinutes()} PM`
                            :`${date.getHours()-12}:${date.getMinutes()} AM`

                            return days===1?time:date.toLocaleDateString();
                }),
                datasets:[{
                    data:historicalData.map((coin)=>coin[1]),
                    label:`Price(Past ${days} days) in ${currency}`,
                    borderColor:"gold"
                },
            ],
            }}
            options={{
                elements:{
                    point:{
                        radius:1,
                    }
                }
            }}
            />
            <div
            style={{
                display:"flex",
                flexDirection:"row",
                margingTop:20,
                justifyContent:"space-around",
                width:"100%"
            }}>
                {chartDays.map(day=>
                <SelectButton
                key={day.value}
                selected={day.value===days}
                onClick={()=>setDays(day.value)}
                >{day.label}</SelectButton>)}
            </div>

          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
