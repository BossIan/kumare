import { useEffect, useState } from 'react';
import './dashboard.css';
import { listDocs, signOut } from '@junobuild/core';
function Dashboard() {
    const [selectedDiv, setSelectedDiv] = useState(1);
    function signOutBtn() {
        signOut().then(
            function () {
                window.location.assign("./")
            }
        )
    }
    function changeTab(i) {
        setSelectedDiv(i)
        
    }
    const list = async () => {
        const {items} = await listDocs({
          collection: 'users',
        });
        console.log(items);

        if (items == undefined || items.length == 0) {
            
          window.location.assign("./")
          return
        }
      };
    
      useEffect(() => {
        (async () => await list())();
      }, []);
    return (
        <div className='dashboard'>
            <div className="sideBar">
                <div className="dashboard-logo sideBtn" onClick={() => {window.location.assign('./')}}>
                    <img src='./logo.png' alt='logo'/>
                    <p>Kumare</p>
                </div>
                <div className={`sideBtn  ${selectedDiv === 1 ? 'selected' : '' }`} onClick={()=>{changeTab(1)}}>
                    <img src='./dashboard/overview.png' alt='overview'/>
                    <p>Overview</p>
                </div>
                <div className={`sideBtn  ${selectedDiv === 2 ? 'selected' : '' }`} onClick={()=>{changeTab(2)}}>
                    <img src='./dashboard/wallet.png' alt='overview'/>
                    <p>My Wallet</p>
                </div>
                <div className={`sideBtn  ${selectedDiv === 3 ? 'selected' : '' }`} onClick={()=>{changeTab(3)}}>
                    <img src='./dashboard/schedules.png' alt='overview'/>
                    <p>My Lends</p>
                    </div>
                <div className={`sideBtn  ${selectedDiv === 4 ? 'selected' : '' }`} onClick={()=>{changeTab(4)}}>
                    <img src='./dashboard/support.png' alt='overview'/>
                    <p>My Loans</p>
                    </div>
                <div className={`sideBtn  ${selectedDiv === 5 ? 'selected' : '' }`} onClick={()=>{changeTab(5)}}>
                    <img src='./dashboard/settings.png' alt='overview'/>
                    <p>Support</p>
                    </div>
                <div className={`sideBtn  ${selectedDiv === 6 ? 'selected' : '' }`} onClick={()=>{changeTab(6)}}>
                    <img src='./dashboard/settings.png' alt='overview'/>
                    <p>Settings</p>
                    </div>
                <div className='feedback'>
                    <p>We would greatly appreciate it if you could take a few moments to review our service and share your thoughts.</p>
                    <button onClick={signOutBtn}>Feedback</button>
                </div>
            </div>
            <div className='main'>
                <div className='top'>
                    <div className='firstDiv-text'>
                        <p>Gandang Umaga,</p>
                        <h1>KUMARE!</h1>
                    </div>
                    <div className='marquee'></div>
                    <div className='thirdDiv-dashboard'>
                        <div className='search'>
                            <img src='./dashboard/search.png' alt='search'/>
                            <p>Search</p>
                        </div>
                        <div className='notification'>
                            <img src='./dashboard/bell.png' alt='bell'/>
                        </div>
                    </div>
                    </div>
                <div className='mainDashboard'>
                    {selectedDiv == 1 && (
                        <div>
                        <div className='lendmoney firstDivs'>
                        <img src="./dashboard/lendmoney.png" alt="lendmoney" />
                        <p>Lend Money</p>
                        </div>
                        <div className='borrowmoney firstDivs'>
                            <img src="./dashboard/borrowmoney.png" alt="borrowmoney" />
                            <p>Borrow Money</p>
                        </div>
                        <div className='firstDivs devices'>
                            <div className='text'><p>Devices</p></div>
                            <div className='device'><p>web</p><p>Bulacan, Philippines</p></div>
                        </div>
                        </div>
                    )}
                    
                </div>
                <div className='secondDiv'></div>
                <div className='thirdDiv'></div>
            </div>
        </div>
    );
}
export default Dashboard;