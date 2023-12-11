import {
  Container,
  Toolbar,
  Typography,
  AppBar,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
  // Button,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
// import { useAuth0 } from "@auth0/auth0-react";
// import FavoriteIcon from '@mui/icons-material/Favorite';
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#ffd700",
    fontFamily: "Montserrat",
    fontWeight: "650",
    fontSize: 18,
    cursor: "pointer",

  },
}));


function Header() {
  const { currency, setCurrency } = CryptoState();
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
  // const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="sticky">
        <Container>
          <Toolbar>
            <Typography onClick={() => history("/")} className={classes.title}>
              CryptoVerse
            </Typography>

            <Select
              varient="outlined"
              style={{
                // backgroundColor:"#14161a",
                width: 100,
                height: 40,
                marginRight: 85,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem

                value={"USD"}>USD</MenuItem>

              <MenuItem
                value={"INR"}>INR</MenuItem>

            </Select>
            {/* <FavoriteIcon style={{
              // backgroundColor:"#14161a",
              width: 40,
              height: 40,
              // marginRight: 40,
            }} />
            {isAuthenticated && <p>{user.name}</p>}
            {isAuthenticated ?

              <Button variant="contained" color="primary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </Button> : <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            } */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
