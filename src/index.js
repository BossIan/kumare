import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './landingPage';
import { GoogleOAuthProvider  } from '@react-oauth/google'
import Login from './components/login';
import reportWebVitals from './reportWebVitals';
import Signup from "./components/signup"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const clientId = "581726821208-8oejsa0engec9m0ocliqqie9lasao2hq.apps.googleusercontent.com"
const router = createBrowserRouter([{
    path: "/",
    element: <LandingPage />
  },{
    path: "/signup",
    element: <Signup />
  },{
  path: "/login",
  element: <Login />
}]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
