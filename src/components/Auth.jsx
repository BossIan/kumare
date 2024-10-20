import { authSubscribe, initSatellite } from "@junobuild/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import NewUser from "./newUser";
import Dashboard from "./dashboard";
import LandingPage from './landingPage';
export const AuthContext = createContext();
export const Auth = () => {
    const router = createBrowserRouter([{
        path: "/",
        element: <LandingPage />,
      }, {
        path: "/dashboard",
        element: <Dashboard />,
      }, {
        path: "/new-user",
        element: <NewUser />
      }
    ]);
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      (async () => await initSatellite({
        satelliteId: "ryuyw-nyaaa-aaaal-amngq-cai",
      }))();
      const sub = authSubscribe((user) => {
        setUser(user)
      }
      );
      return () => sub();
    }, []);
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    if (!loading) {
      return (
        <AuthContext.Provider value={{ user }}>
          <RouterProvider router={router}/>
        </AuthContext.Provider>
      );
    } else {
      return <div></div>
    }
  };

