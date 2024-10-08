import './dashboard.css';
import { signOut } from '@junobuild/core';
import { createContext } from "react";
import { userContext } from '../landingPage';
import Db from './db';
function Dashboard() {
    console.log(userContext);
    
    if (userContext == undefined && userContext == null) {
        window.location.assign("./")
    }

    function signOutBtn() {
        signOut().then(
            function () {
                window.location.assign("./")
            }
        )
    }
    return (
        
        <div className='dashboard'>
            <Db/>
            <div className="sideBar">
                <div className="logo sideBtn">
                    {/* <img src={logo} alt='logo'/> */}
                </div>
                <div className="sideBtn">
                    {/* <img src={logo} alt='logo'/><span>Dashboard</span> */}
                </div>
                <div className="sideBtn">
                    {/* <img src={logo} alt='logo'/><span>User</span> */}
                </div>
                <div className="sideBtn">
                    {/* <img src={logo} alt='logo'/><span>Product</span> */}
                </div>
                <div className="sideBtn">
                    {/* <img src={logo} alt='logo'/><span>Blog</span> */}
                </div>
                <button onClick={signOutBtn}>Sign Out</button>
            </div>
            <div className='main'>
                
            </div>
        </div>
    );
}
export default Dashboard;