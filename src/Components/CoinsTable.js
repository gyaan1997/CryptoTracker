/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { CoinList } from "../Configuration/Api";
import {
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {numbersWithCommas} from "./Carousel";
import { Pagination } from "@material-ui/lab";

const useStyles=makeStyles(()=>({ 
  row:{
    backgroundColor:"#16171a",
    cursor:"pointer",
    "&:hover":{
      backgroundColor:"#131111"
    },
    fontFamily:"Monserrat"
  },
  pagination:{
    "& .MuiPaginationItem-root":{   //from documentation
      color:"gold",
    }
  }
}));

function CoinsTable() {
  const { currency ,symbol} = CryptoState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false); //loader
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const history=useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  // console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toUpperCase().includes(search)
    );
  };
  const classes=useStyles();



  return (
    <ThemeProvider theme={darkTheme} >
      <Container style={{ textAlign: "center" }}>
        <Typography
          varient="h4"
          style={{ margin: 18, fontFamily: "Monserrat", fontSize:"large" }}
        >
          CryptoCurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a crypto..."
          varient="outlined"
          style={{ marginBotton: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#f7e98e" }}>
                <TableRow>
                  {["coin", "Price", "24hr Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "800",
                          fontFamily: "Monteserrat",
                          fontSize:"medium",
                        }}
                        key={head}
                        align={head === "coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
              {handleSearch()
              .slice((page-1)*10,(page-1)*10+10)
              .map((row)=>{
                const profit=row.price_change_percentage_24h >0;

                return(
                  <TableRow
                  onClick={()=>history(`/coins/${row.id}`)}
                  className={classes.row}
                  key={row.name}
                  
                  >
                    <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={{
                      display:"flex",
                      gap:15,
                    }}
                  >
                    <img
                    src={row?.image}
                    alt={row?.name}
                    height="50"
                    width="50"
                    style={{marginBottom:10}}
                    />
                    <div>
                    <span style={{
                      textTransform:"uppercase",
                      fontSize:22,
                    }}>{row.symbol}</span> <br/>
                    <span style={{color:"darkgrey"}}>{row.name}</span>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {symbol} {" "} {numbersWithCommas(row?.current_price.toFixed(2))}
                  </TableCell>
                  <TableCell align="right"
                  style={{
                    color:profit>0? "rgb(0,255,0)":"rgb(255,0,0)",
                    fontWeight:500,
                  }}>

                   {row?.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell  align="right" >
                  {symbol} {" "}
                    {row?.market_cap.toString().slice(0,-6)}M
                  </TableCell>
                  </TableRow>
                )
              })}
              </TableBody>
              
            </Table>
          )}
        </TableContainer>
        <Pagination 
        style={{
          padding:20,
          display:"flex",
          justifyContent:"center",
          width:"100%",
        }}
        classes={{ul:classes.pagination}}
        count={(handleSearch().length/10).toFixed(0)}
            onChange={(_,value)=>{   // get it?
              setPage(value);
              window.scroll(0,450);
            }}
            >
        </Pagination>
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
