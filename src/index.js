import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './components/dashboard';
import LandingPage from './landingPage';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initSatellite } from '@junobuild/core'

const router = createBrowserRouter([{
    path: "/",
    element: <LandingPage />
  }, {
    path: "/dashboard",
    element: <Dashboard />
  }
]);
(async () => await initSatellite({
  satelliteId: "ryuyw-nyaaa-aaaal-amngq-cai",
}))();
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
