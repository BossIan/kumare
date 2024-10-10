import { authSubscribe } from "@junobuild/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Dashboard from './dashboard';
import LandingPage from '../landingPage';
export const AuthContext = createContext();
function Auth(){
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
      const sub = authSubscribe((user) => setUser(user)
      );
      return () => sub();
    }, []);
  
    return (
      <AuthContext.Provider value={{ user }}>
        {user !== undefined && user !== null ? (
        <RouterProvider router={router}/>
        ) : (
          <Dashboard />
        )}
      </AuthContext.Provider>
    );
  };

export default Auth;
  