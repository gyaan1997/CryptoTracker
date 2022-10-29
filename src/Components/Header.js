import {
  Container,
  Toolbar,
  Typography,
  AppBar,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#ffd700",
    fontFamily: "Montserrat",
    fontWeight: "650",
    fontSize:18,
    cursor: "pointer",
  
  },
}));


function Header() {
 const{currency,setCurrency}=CryptoState();
//   console.log(currency);
  const history = useNavigate();
  //UseHistory hook (deprecated now)
  const classes = useStyles();


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="sticky">
        <Container>
          <Toolbar>
            <Typography onClick={() => history("/")} className={classes.title}>
              CryptoTracker
            </Typography>
            <Select
              varient="outlined"
              style={{
                // backgroundColor:"#14161a",
                width: 100,
                height: 40,
                marginRight: 115,
              }}
              value={currency}
              onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem  
               
               value={"USD"}>USD</MenuItem>

              <MenuItem 
               value={"INR"}>INR</MenuItem>

            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
