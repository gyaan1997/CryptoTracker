import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoContext from "./CryptoContext"
import "react-alice-carousel/lib/alice-carousel.css";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-1zi4d13h6zfmijzo.us.auth0.com"
    clientId="1LGBkJoeRfWNMHg4ifgUan6loeOc9EDk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
 

   <CryptoContext>
   <App />
   </CryptoContext>
   </Auth0Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
