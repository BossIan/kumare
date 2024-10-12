import { authSubscribe, initSatellite, listDocs } from "@junobuild/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Dashboard from './dashboard';
import LandingPage from '../landingPage';
export const AuthContext = createContext();
export const Auth = () => {
    const router = createBrowserRouter([{
        path: "/",
        element: <LandingPage />
      }, {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]);
    const [user, setUser] = useState(undefined);
  
    useEffect(() => {

      (async () => await initSatellite({
        satelliteId: "ryuyw-nyaaa-aaaal-amngq-cai",
      }))();
      const sub = authSubscribe((user) => setUser(user)
      );
      return () => sub();
    }, []);
    const list = async () => {
      // TODO: STEP_7_LIST_DOCS
      try {
        const { items } = await listDocs({
          collection: "notes",
        });
        console.log(items);
      } catch (error) {
        console.log(error);
        
      }
  };
    useEffect(() => {
      (async () => await list())();
    });
  
    return (
      <AuthContext.Provider value={{ user }}>
        {user !== undefined && user !== null ? (
        <RouterProvider router={router}/>
        ) : (
          <LandingPage />
        )}
      </AuthContext.Provider>
    );
  };

