import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './landingPage';
import Login from './account/login';
import reportWebVitals from './reportWebVitals';
import Signup from "./account/signup"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
