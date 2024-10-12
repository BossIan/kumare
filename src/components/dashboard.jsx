import './dashboard.css';
import { signOut } from '@junobuild/core';
import { AuthContext } from './Auth';
import { useContext, useEffect } from 'react';
import Db from './db';
function Dashboard() {
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
                <div className="dashboard-logo sideBtn">
                    <img src='./logo.png' alt='logo'/>
                    <p>Kumare</p>
                </div>
                <div className="sideBtn">
                    <img src='./dashboard/overview.png' alt='overview'/>
                    <p>Overview</p>
                </div>
                <div className="sideBtn">
                    <img src='./dashboard/wallet.png' alt='overview'/>
                    <p>My Wallet</p>
                </div>
                <div className="sideBtn">
                    <img src='./dashboard/schedules.png' alt='overview'/>
                    <p>Schedules</p>
                    </div>
                <div className="sideBtn">

                </div>
                <div className="sideBtn">
                    <img src='./dashboard/community.png' alt='overview'/>
                    <p>Community</p>
                    </div>
                <div className="sideBtn">
                    <img src='./dashboard/support.png' alt='overview'/>
                    <p>Support</p>
                    </div>
                <div className="sideBtn">
                    <img src='./dashboard/settings.png' alt='overview'/>
                    <p>Settings</p>
                    </div>
                <div className="sideBtn">

                <button onClick={signOutBtn}>Sign Out</button>
                </div>
            </div>
            <div className='main'>
                
            </div>
        </div>
    );
}
export default Dashboard;