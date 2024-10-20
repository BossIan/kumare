import { useEffect, useRef, useState } from 'react';
import './dashboard.css';
import {SignOutBtn} from './signOutBtn'
import { CreditScore } from './creditscore';
import { listDocs,setDoc } from '@junobuild/core';
import { useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
export var value;
function Dashboard() {
    const [selectedDiv, setSelectedDiv] = useState(1);
    const [loading, setLoading] = useState(true)
    const [intervalOptions, setIntervalOptions] = useState([]);
    const chartRef = useRef(null);
    function toDate(dateStr) {
        let date = new Date(dateStr);
        
        return (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
        date.getDate().toString().padStart(2, '0') + '/' +
        date.getFullYear()
     
    }
  function displayCanvas() {
    const ctx = chartRef.current?.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Exchange Rates',
          data: [1, 3, 5, 4, 6, 7, 6, 7, 8, 9],
          borderColor: '#A0522D',
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: '#A0522D',
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Hides the legend
          }
        },
        scales: {
          x: {
            grid: {
              display: false // Removes vertical grid lines
            },
            ticks: {
              maxRotation: 0, // Prevent slanted text
              minRotation: 0  // Keep the text horizontal
            }
          },
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              display: true // Shows horizontal grid lines
            }
          }
        }
      }
    });
  }
    const intervalByTerm = {
        'Short Term': ['Weekly', 'Bi-Weekly'],
        'Long Term': ['Monthly', 'Quarterly'],
      }
    const interestByInterval = {
        'Weekly': 0,
        'Bi-Weekly': 0.01,
        'Monthly': 0.025,
        'Quarterly' : 0.035
    }

    const navigate = useNavigate();
    const [balance, setBalance] = useState('0.00')
    const [lendVisible, setLendVisible] = useState(false)
    const [loanVisible, setLoanVisible] = useState(false)
    const [lendViewVisible, setLendViewVisible] = useState(false)
    const [loanViewVisible, setLoanViewVisible] = useState(false)
    const [loanData, setLoanData] = useState([])
    const [lendData, setLendData] = useState([])
    const [min, setMin] = useState(new Date().toISOString().split("T")[0])
    const [dbData, setDbData] = useState({})
    const [totalAmount, setTotalAmount] = useState('0.00')
    const [totalEarnings, setTotalEarnings] = useState('0.00')
    const [version, setVersion] = useState(1)
    const [loanInterval, setLoanInterval] = useState('')
    const [key, setKey] = useState('')
    const [paymentDate, setPaymentDate] = useState('mm/dd/yyyy')
    const [dueDate, setDueDate] = useState('')
    const [credit, setCredit] = useState('')
    const [interestRate, setInterestRate] = useState(0)
    const [viewLendData, setViewLendData] = useState({})
    const [viewLoanData, setViewLoanData] = useState({})
    const [newLoan, setNewLoan] = useState({
        paymentTerm: '',
        loanDuration: '',
        loanAmount: '',
        status: 'Pending'
    })
    const [newLend, setNewLend] = useState({
        paymentTerm: '',
        lendAmount: '',
        status: 'Pending'
    })
    var today = new Date();
    function toUpper(str) {
        return str
        .toLowerCase()
        .split(' ')
        .map(function(word) {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');
    }
    const handleChangeLend = (e) => {     
        var { name, value } = e.target;
        if (name == 'paymentDate') {
            setPaymentDate(value)
        }
        var today =  new Date()
        if (name == 'paymentTerm') {
            if (value == 'Short Term') {
                setPaymentDate('')
            today =  new Date()
                today.setMonth(today.getMonth() + 1)
            } else if (value == 'Long Term') {
                setPaymentDate('')
            today =  new Date()
            today.setMonth(today.getMonth() + 13)
            }
            setMin(new Date(today).toISOString().split("T")[0])
        }
        if (newLend.paymentTerm == 'Short Term' && name == 'lendAmount') {
                let val = (value * 1.15).toFixed(0);
                setInterestRate(15)
                setTotalEarnings(val)
            } else if (newLend.paymentTerm == 'Long Term' && name == 'lendAmount') {
            let val = (value * 1.16).toFixed(0);
                setInterestRate(16)
                setTotalEarnings(val)
            } else if (value == 'Short Term' && name == 'paymentTerm') {
                let val = (newLend.lendAmount * 1.15).toFixed(0);
                setInterestRate(15)
                setTotalEarnings(val)
            } else if (value == 'Long Term' && name == 'paymentTerm') {
                let val = (newLend.lendAmount * 1.16).toFixed(0);
                setInterestRate(16)
                setTotalEarnings(val)
            }
        setNewLend({
            ...newLend,
            [name]: value
        });
    }
    const handleChange = (e) => {
        var interest;
        var { name, value } = e.target;
        if (dbData.creditScore >= 800 && dbData.creditScore <= 850) {
            interest = 1.15
        } else if (dbData.creditScore >= 700 && dbData.creditScore <= 799) {
                interest = 1.165
        } else if (dbData.creditScore >= 650 && dbData.creditScore <= 699) {
                interest = 1.1715
        } else if (dbData.creditScore >= 450 && dbData.creditScore <= 649) {
                interest = 1.18
        } else if (dbData.creditScore < 450) {
                interest = 1.1875
        }
        setInterestRate((interest - 1)*100)
        
        if (name == 'loanAmount') {
            let val = (value * (interest + interestByInterval[loanInterval])).toFixed(0);
            setTotalAmount(val)
        } else if (name == 'loanInterval') {
            let val = (newLoan.loanAmount * (interest + interestByInterval[value])).toFixed(0);
            setTotalAmount(val)
            setLoanInterval(value)
        } 
        setNewLoan({
          ...newLoan,
          [name]: value
        });
        if (name == 'paymentTerm') {
            setIntervalOptions(intervalByTerm[value] || []);  
            
            setLoanInterval(intervalOptions[0])
            let val = (newLoan.loanAmount * (interest + interestByInterval[intervalByTerm[value][0]])).toFixed(0);
            
            setTotalAmount(val)
        } 
        if (name == 'loanDuration') {
            if (isNaN(parseInt(value))) {
                setDueDate('mm/dd/yyyy')
                
            } else {
                today.setMonth(today.getMonth() + parseInt(value) );
                setDueDate((today.getMonth() + 1).toString().padStart(2, '0') + '/' +
                today.getDate().toString().padStart(2, '0') + '/' +
                today.getFullYear())
                today = new Date();
            }
            
        }
      };
    async function lend() {
        const currentDate = new Date();
        const inputDateValue = paymentDate;
        const inputDate = new Date(inputDateValue);
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const inputYear = inputDate.getFullYear();
        const inputMonth = inputDate.getMonth();
        let monthDifference = (inputYear - currentYear) * 12 + (inputMonth - currentMonth);
        var interval = ''
        if (newLend.paymentTerm == 'Long Term') {
            interval = 'Monthly'
        } else {
            interval = 'Weekly'
        }
        let data = {
            lendInterval: interval,
            interest: interestRate ,
            paymentTerm: newLend.paymentTerm,
            paymentDate: paymentDate,
            lendAmount: newLend.lendAmount,
            totalEarnings: totalEarnings,
            lendDuration: monthDifference
        }
        
        lendData.push(data)
        lendData[lendData.length - 1].index = lendData.length - 1
        setLendData(lendData)
        dbData['lendData'] = lendData
        try {
            await setDoc({
                collection: "users",
                doc: {
                  key,
                  data: dbData,
                  version: version
              }
            }).then(()=>{
                setLendVisible(false)
                setNewLend({
                    paymentTerm: '',
                    lendAmount: '',
                })
                setPaymentDate('mm/dd/yyyy')
                setTotalEarnings('0.00')
                list()
            });
        } catch (error) {
            console.log(error);
            
        }
    }
    async function borrow() {
        let data = {
            paymentTerm: newLoan.paymentTerm,
            loanInterval: loanInterval,
            loanDuration: newLoan.loanDuration,
            loanAmount: newLoan.loanAmount,
            dueDate: dueDate,
            interest: interestRate,
            totalAmount: totalAmount
        }
        loanData.push(data)
        loanData[loanData.length - 1].index = loanData.length - 1
        setLoanData(loanData)
        dbData['loanData'] = loanData
        try {
            await setDoc({
                collection: "users",
                doc: {
                  key,
                  data: dbData,
                  version: version
              }
            }).then(()=>{
                setLoanVisible(false)
                setNewLoan({
                    paymentTerm: '',
                    loanDuration: 0,
                    loanAmount: 0,
                })
                setDueDate('mm/dd/yyyy')
                setTotalAmount('0.00')
                list()
            });
        } catch (error) {
            console.log(error);
            
        }
    }
    function changeTab(i) {
        setSelectedDiv(i)
        
    }
    const list = async () => {
        const {items} = await listDocs({
          collection: 'users',
        });
        if (items == undefined || items.length == 0) {
            
            navigate("/")
          return
        }
        value = items[0].data.creditScore
        setBalance(items[0].data.balance)
        
        setDbData(items[0].data)
        if (items[0].data.balance == undefined) {
            setBalance('0.00')
        }
        setLoanData(items[0].data.loanData)
        if (items[0].data.loanData == undefined) {
            setLoanData([])
        }
        setLendData(items[0].data.lendData)
        if (items[0].data.lendData == undefined) {
            setLendData([])
        }
        
        setLoading(false)
        setKey(items[0].key)
        setVersion(items[0].version)
        if (items[0].data.creditScore >= 800 && items[0].data.creditScore <= 850) {
            setCredit('Kasangga')
        } else if (items[0].data.creditScore >= 700 && items[0].data.creditScore <= 799) {
            setCredit('Katuwang')
        } else if (items[0].data.creditScore >= 650 && items[0].data.creditScore <= 699) {
            setCredit('Kumare')
        } else if (items[0].data.creditScore >= 450 && items[0].data.creditScore <= 649) {
            setCredit('Kumpare')
        } else if (items[0].data.creditScore < 450) {
            setCredit('Kapitbahay')
        }
      };
    
      useEffect(() => {
        
        (async () => await list())();
        
      }, []);
    if (!loading) {

        
        return (
            <div className='dashboard'>
                <div className="sideBar">
                    <div className="dashboard-logo sideBtn" onClick={() => {navigate('/')}}>
                        <img src='./logo.png' alt='logo'/>
                        <p>Kumare</p>
                    </div>
                    <div className={`sideBtn  ${selectedDiv === 1 ? 'selected' : '' }`} onClick={()=>{changeTab(1)}}>
                        <img src='./dashboard/overview.png' alt='overview'/>
                        <p>Overview</p>
                    </div>
                    <div className={`sideBtn  ${selectedDiv === 2 ? 'selected' : '' }`} onClick={()=>{changeTab(2); setTimeout(() => {
                        displayCanvas()
                    }, 1000);}}>
                        <img src='./dashboard/wallet.png' alt='overview'/>
                        <p>My Wallet</p>
                    </div>
                    <div className={`sideBtn  ${selectedDiv === 3 ? 'selected' : '' }`} onClick={()=>{changeTab(3)}}>
                        <img src='./dashboard/mylends.png' alt='overview'/>
                        <p>My Lends</p>
                        </div>
                    <div className={`sideBtn  ${selectedDiv === 4 ? 'selected' : '' }`} onClick={()=>{changeTab(4)}}>
                        <img src='./dashboard/myloans.png' alt='overview'/>
                        <p>My Loans</p>
                        </div>
                    <div className={`sideBtn  ${selectedDiv === 5 ? 'selected' : '' }`} onClick={()=>{changeTab(5)}}>
                        <img src='./dashboard/support.png' alt='overview'/>
                        <p>Support</p>
                        </div>
                    <div className={`sideBtn  ${selectedDiv === 6 ? 'selected' : '' }`} onClick={()=>{changeTab(6)}}>
                        <img src='./dashboard/settings.png' alt='overview'/>
                        <p>Settings</p>
                        </div>
                    <div className='feedback'>
                        <p>We would greatly appreciate it if you could take a few moments to review our service and share your thoughts.</p>
                        <SignOutBtn/>
                    </div>
                </div>
                <div className='main'>
                    <div className='top'>
                        <div className='firstDiv-text'>
                            <p>Gandang Umaga,</p>
                            <h1>KUMARE!</h1>
                        </div>
                        <div className='marquee'>
                            <img src="./dashboard/isky.png" alt="" />
                            <img src="./dashboard/bsu.png" alt="" />
                            <img src="./dashboard/psite.png" alt="" />
                            <img src="./dashboard/isla.png" alt="" />
                            <img src="./dashboard/isky.png" alt="" />
                            <img src="./dashboard/bsu.png" alt="" />
                            <img src="./dashboard/psite.png" alt="" />
                            <img src="./dashboard/isla.png" alt="" />
                            </div>
                        <div className='thirdDiv-dashboard-top'>
                            <div className='search'>
                                <img src='./dashboard/search.png' alt='search'/>
                                <p>Search</p>
                            </div>
                            <div className='notification'>
                                <img src='./dashboard/bell.png' alt='bell'/>
                            </div>
                        </div>
                    </div>
                    <div className='divFlex'>
                        {selectedDiv == 1 && (
                            <div  className='mainDashboard'>
                            <div className="topDiv">
                                <div className='firstDiv-dashboard'>
                                    <div className='lendmoney firstDivs' onClick={()=> {setLendVisible(true)}}>
                                    <img src="./dashboard/lendmoney.png" alt="lendmoney"/>
                                    <p>Lend Money</p>
                                    </div>
                                    <div className='borrowmoney firstDivs' onClick={()=> {setLoanVisible(true)}}>
                                        <img src="./dashboard/borrowmoney.png" alt="borrowmoney" />
                                        <p>Borrow Money</p>
                                    </div>
                                </div>
                                <CreditScore/> 
                            </div>
                            <div className='secondDiv-dashboard'>
                            <div className='devices'>
                                    <div className='text'><p>Devices</p></div>
                                <hr></hr>
                                <div className='device'><h3>Web</h3><span>Bulacan, Philippines</span></div>
                            </div>
                            <div className="loan-limit-container">
                                <div className="progress">
                                <h2>Increase your loan limit</h2>
                                    <span className="progress-count"><span style={{color:`#EA871E`}}>4/</span>4 <span style={{color:`#EA871E`, fontSize:`1.5vw`, lineHeight:`0.5`}}>--------</span></span>
                                </div>
                                <hr></hr>
                                <ul className="loan-limit-tips">
                                    <li>Complete your Profile and Verification</li>
                                    <li>Build a Good Credit Score</li>
                                    <li>Borrow Small Amounts and Repay on Time</li>
                                    <li>Maintain Good Borrowing Habits</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        )}
                       {selectedDiv == 2 && (
                        <div className='mainDashboard'>
                            <div className="wallet">
                                <div className="mainWallet">
                                    <div className="coinDiv">
                                        <img src="./dashboard/coinmare.png" alt="coin" />
                                        <span>CoinMare</span>
                                    </div>
                                    <div className="balance">
                                        <span>Total Balance:</span>
                                        <h1>{balance}</h1>
                                        <hr></hr>
                                    </div>
                                    <div className="buttons">
                                        <button>Send</button>
                                        <button>Receive</button>
                                        <button>Transfer</button>
                                        <button>More</button>
                                    </div>
                                </div>
                                <div className="graphDiv">
                                <div className="chart-header">
                                        <p className="subheading">CMT Currency</p>
                                        <h1 className="main-heading">Exchange Rates</h1>
                                    </div>
                                    <div className="chart-container">
                                        <canvas ref={chartRef}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                        {selectedDiv == 3 && (
                        <div className='mainDashboard'>
                            <div className="mylends">
                                <div className="mylends-text">
                                    <span>My Lends</span>
                                    <img src="./dashboard/arrow.png" alt="arrow" className='viewmore'/>
                                </div>
                                <hr />
                                <div className="buttonsLends">
                                    <div className="mainButtonLends">
                                        <button onClick={() => {setLendVisible(true)}}>New Lend</button>
                                        <button>View Earnings</button>
                                        <button>Insurance</button>
                                    </div>
                                    <button className='moreButton'>...</button>
                                </div>
                                <div className="lends">
                                    {lendData.map((lend) => (
                                    <div key={nanoid()} className='lend'>
                                        <div className="currentBal">
                                            <p>Current Balance:</p>
                                            <h1>{`₱ ${lend.totalEarnings}`}</h1>
                                        </div>  
                                        <div className="loan-main">
                                            <div className="due-date">
                                                <p>{`Due : ${lend.paymentDate}`}</p>
                                                <span>{lend.paymentTerm}</span>
                                            </div>
                                            <div className="loan-container">
                                                <div className="loan-text">
                                                    <span>Status: <span style={{color:`#878680`}}>Active</span></span>
                                                    <span>Main Borrower: <span style={{color:`#878680`}}>Maria Jhoanna</span></span>
                                                </div>
                                                <button onClick={()=>{
                                                    setViewLendData(lend)
                                                    setLendViewVisible(true)
                                                }}>View</button>
                                            </div>
                                            <p className='moreDetails'>More details...</p>
                                        </div>
                                    </div>
                                    ))}
  
                                </div>
                            </div>
                        </div>
                        )}
                        {selectedDiv == 4 && (
                        <div className='mainDashboard'>
                            <div className="mylends">
                                <div className="mylends-text">
                                    <span>My Loans</span>
                                    <img src="./dashboard/arrow.png" alt="arrow" className='viewmore'/>
                                </div>
                                <hr />
                                <div className="buttonsLends">
                                    <div className="mainButtonLends">
                                        <button onClick={() => {setLoanVisible(true)}}>Borrow now</button>
                                        <button>Active Loans</button>
                                        <button>Loan Repayment</button>
                                    </div>
                                    <button className='moreButton'>...</button>
                                </div>
                                <div className="lends">
                                    {loanData.map((loan) => (
                                    <div key={nanoid()} className='loan'>
                                        <div className="currentBal">
                                            <p>Current Balance:</p>
                                            <h1>{`₱ ${loan.totalAmount}`}</h1>
                                        </div>  
                                        <div className="loan-main">
                                            <div className="due-date">
                                                <p>{`Due : ${loan.dueDate}`}</p>
                                                <span>{loan.paymentTerm}</span>
                                            </div>
                                            <div className="loan-container">
                                                <div className="loan-text">
                                                    <span>Status: <span style={{color:`#878680`}}>Active</span></span>
                                                    <span>Main Lender: <span style={{color:`#878680`}}>Maria Jhoanna</span></span>
                                                </div>
                                                <button onClick={()=>{
                                                    setViewLoanData(loan)
                                                    setLoanViewVisible(true)
                                                }}>View</button>
                                            </div>
                                            <p className='moreDetails'>More details...</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        )}
                        {selectedDiv == 5 && (
                        <div className='mainDashboard'>
                            <div className="container support-container">
                                <h2>Support</h2>
                                <hr />
                                <h3>Contact Support</h3>
                                <p>Have any questions, Kumare? Feel free to ask us anytime!</p>
                                <textarea placeholder="Message"></textarea>
                                <button className="send-button">Send</button>
                            </div>
                    
                            <div className="container faq-container">
                                <h3>Frequently Asked Questions</h3>
                                <div className="faq-item">
                                    <img src="./dashboard/bulletarrow.png" alt="Icon" className="faq-icon"/>
                                    <span>What are the interest rates?</span>
                                </div>
                                <div className="faq-item">
                                    <img src="./dashboard/bulletarrow.png" alt="Icon" className="faq-icon"/>
                                    <span>What happens if I miss a repayment?</span>
                                </div>
                                <div className="faq-item">
                                    <img src="./dashboard/bulletarrow.png" alt="Icon" className="faq-icon"/>
                                    <span>Is my data safe on KUMARE?</span>
                                </div>
                            </div>
                            <div className="container call-container">
                                <h3>Call Kumare!</h3>
                                <p>If you have any questions or need help with your account, loan applications, or any other concerns, our Call Support is here for you. We offer dedicated support through phone for quick and effective assistance.</p>
                                <button className="call-button">Call</button>
                            </div>
                        </div>
                        )}
                        {selectedDiv == 6 && (
                        <div className='mainDashboard'>
                            <div className="settingsDiv">
                                <div className="settings-header">
                                    <div>
                                        <h1>{toUpper(dbData.firstName) + " " + toUpper(dbData.lastName)}</h1>
                                        <p>{dbData.city + ', ' + dbData.province}</p>
                                    </div>
                                    <img src="./dashboard/edit.png" alt="Edit Icon"/>
                                </div>
                                <div className="settings-form">
                                <div className="settings-form-container">
                                    <div className="settings-form-group">
                                        <label htmlFor="alt-contact">Contact Number</label>
                                        <input disabled type="text" id="alt-contact" placeholder={dbData.contactNumber}/>
                                    </div>
                                    <div className="settings-form-group">
                                        <label htmlFor="alt">Alternative Contact Number</label>
                                        <input disabled type="alt" id="alternative-contact-number" placeholder={dbData.altContactNumber}/>
                                    </div>
                                    <div className="settings-form-group">
                                        <label htmlFor="email-address">Email Address</label>
                                        <input disabled type="text" id="email-address" placeholder={dbData.email}/>
                                    </div>
                                </div>
                                <div className="settings-form-container">
                                    <div className="settings-form-group">
                                        <label htmlFor="address">Address</label>
                                        <input disabled type="text" id="address" placeholder={dbData.city + ', ' + dbData.province}/>
                                    </div>
                                    <div className="settings-form-group">
                                        <label htmlFor="permanent-address">Permanent Street Address</label>
                                        <input disabled type="text" id="permanent-address" placeholder={toUpper(dbData.street)}/>
                                    </div>
                                    <div className="settings-form-group">
                                        <label htmlFor="postal-code">Postal Code</label>
                                        <input disabled type="text" id="postal-code" placeholder={dbData.postalCode}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        )}
                        <div className='thirdDiv-dashboard'>
                            <div className="card">
                                <div className='announceDiv'>
                                    <h2>Announcements</h2>
                                    <img className='viewmore' src="./dashboard/arrow.png" alt="arrow" />
                                </div>
                                <hr></hr>
                                <div className="announcement">
                                    <div className="announceHeader">
                                        <h3>We're Growing!</h3>
                                        <img src="./dashboard/growing.png" alt="" />
                                    </div>
                                    <p>
                                            Thank you to all our borrowers and lenders for trusting KUMARE. We've
                                            reached an incredible milestone of 1,000 successful loans! Stay tuned
                                            for more exciting updates as we continue to empower communities
                                            through microlending.
                                    </p>
                                </div>
                                <hr></hr>
                                <div className="announcement">
                                    <div className="announceHeader">
                                        <h3>Holiday Greetings from KUMARE!</h3>
                                        <img src="./dashboard/holiday.png" alt="" />
                                    </div>
                                        <p>
                                            This festive season, we’re offering special low-interest loans to help
                                            with your holiday shopping! Take advantage of this limited-time offer
                                            and apply for your holiday loan today.
                                        </p>
                                </div>
                                <hr></hr>
                            </div>
                            <div className="card">
                                <div className="transaction">
                                    <div className="transactionTitle">
                                        <h2>Transaction records</h2>
                                        <img className='viewmore' src="./dashboard/arrow.png" alt="arrow" />
                                    </div>
                                    <hr></hr>
                                    <h3>Lender Transaction :</h3>  
                                    <p><span>Date:</span> October 1, 2024</p>
                                    <p><span>Transaction ID:</span> TRX2001</p>
                                    <p><span>Lend Amount:</span> 2,500</p>
                                    <p><span>Interest Earned:</span> 200 (13%)</p>
                                    <p><span>Due Date:</span> October 24, 2024</p>
                                    <p><span>Status:</span> Paid</p>
                                </div>
                                <button className="view-all">View all</button>
                            </div>
                        </div>
                    </div>
                </div>
                {loanVisible && (
                    <div className="popup-overlay">
                        <div className="popup-backdrop"onClick={(e) => {setLoanVisible(false)}}></div>
                        <div className="popup-content">
                            <div className="popup-title">
                                <h2>Borrow Money</h2>
                                <img src="./dashboard/exitBtn.png" alt=""onClick={()=> {setLoanVisible(false)}} />
                            </div>
                            <form action={() => borrow()} className="popup-main">
                                <p>
                                Simple, fast, and community-driven. Whether you need a small loan for personal expenses or business use, our platform connects you with lenders willing to support your financial needs.
                                </p>
                        
                                <div className="form-group">
                                    <label>Payment Terms</label>
                                    <select
                                    name='paymentTerm'
                                    value={newLoan.paymentTerm}
                                      onChange={handleChange}
                                      required
                                    >
                                    <option disabled value="">Select Term</option>
                                        <option value="Short Term">Short Term</option>
                                        <option value="Long Term">Long Term</option>
                                    </select>
                                </div>
                        
                                <div className="form-group">
                                    <label>Loan Interval</label>
                                    <select
                                    name='loanInterval'
                                    value={loanInterval}
                                      onChange={handleChange}
                                      required
                                    >
                                    <option disabled value="">Select Interval</option>
                                        {intervalOptions.map((interval) => (
                                        <option key={interval} value={interval}>
                                            {interval}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                    <div className="form-group">
                                        <label>Loan Duration</label>
                                        <div className="popup-duration">
                                        <input
                                        type="number"
                                        placeholder="Enter Loan Duration"
                                        name='loanDuration'
                                        value={newLoan.loanDuration}
                                          onChange={handleChange}
                                          required
                                        />
                                        <span>months</span>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label>Loan Amount</label>
                                    <input
                                    type="number"
                                    className='amount'
                                    placeholder="Enter Loan Amount"
                                    name='loanAmount'
                                    value={newLoan.loanAmount}
                                      onChange={handleChange}
                                      required
                                    />
                                </div>
                                <div className="popup-details">
                                    <div className="detail-group">
                                        <label>Due Date</label>
                                        <span>{dueDate}</span>
                                    </div>
                                    <div className="detail-group">
                                        <label>Total Amount:</label>
                                        <span>{totalAmount}</span>
                                    </div>
                                </div>
                        
                                <button className="borrow-button" type='submit'>
                                    Borrow
                                </button>
                            </form>
                        </div>
                  </div>
                )}
                {lendVisible && (
                    <div className="popup-overlay">
                        <div className="popup-backdrop"onClick={(e) => {setLendVisible(false)}}></div>
                        <div className="popup-content">
                            <div className="popup-title">
                                <h2>Lend Money</h2>
                                <img src="./dashboard/exitBtn.png" alt=""onClick={()=> {setLendVisible(false)}} />
                            </div>
                            <form action={() => lend()} className="popup-main">
                                <p>
                                You can earn passive income by providing funds to borrowers in need of small loans. With our user-friendly platform, you can easily lend your available funds and track your earnings. Each lending transaction you initiate will yield a 15% initial return on the loan amount you provide, allowing you to earn while supporting community members.
                                </p>
                        
                                <div className="form-group">
                                    <label>Payment Terms</label>
                                    <select
                                    name='paymentTerm'
                                    value={newLend.paymentTerm}
                                      onChange={handleChangeLend}
                                      required
                                    >
                                    <option disabled value="">Select Term</option>
                                        <option value="Short Term">Short Term</option>
                                        <option value="Long Term">Long Term</option>
                                    </select>
                                </div>
                        
                                <div className="form-group">
                                        <label>Repayment Dates</label>
                                        <input
                                        min={min}
                                        type="date"
                                        className='amount'
                                        placeholder="Enter Loan Duration"
                                        name='paymentDate'
                                        value={paymentDate}
                                          onChange={handleChangeLend}
                                          required
                                        />
                                </div>
                                <div className="form-group">
                                    <label>Lend Amount</label>
                                    <input
                                    type="number"
                                    className='amount'
                                    placeholder="Enter Loan Amount"
                                    name='lendAmount'
                                    value={newLend.lendAmount}
                                      onChange={handleChangeLend}
                                      required
                                    />
                                </div>
                                <div className="popup-details">
                                    <div className="detail-group">
                                        <label>Total Earnings:</label>
                                        <span>{totalEarnings}</span>
                                    </div>
                                </div>
                        
                                <button className="borrow-button" type='submit'>
                                    Lend
                                </button>
                            </form>
                        </div>
                  </div>
                )}
                {lendViewVisible && (
                    <div className="popup-overlay">
                        <div className="popup-backdrop"onClick={(e) => {setLendViewVisible(false)}}></div>

                        <div className="popup-content">
                            <div className="popup-title">
                                <h2>My Lend</h2>
                                <img src="./dashboard/exitBtn.png" alt=""onClick={()=> {setLendViewVisible(false)}} />
                            </div>
                            <div  className="popup-main">
                                <p>
                                The My Lend sections shows the details about the current active lends. Here, you’ll find information about your current lend including the due date, name of borrower, and the details about the transaction.
                                </p>
                                <div className="popup-view-details">
                                        <div className="popup-view-detail">
                                            <p>Main Borrower:</p>
                                            <p>Due Date: </p>
                                            </div>
                                        <div className="popup-view-detail popup-values">
                                            <span>Maria Jhoanna</span>
                                            <span>{toDate(viewLendData.paymentDate)}</span>
                                        </div>
                                        <div className="popup-view-detail">
                                            <p>Credit:</p>
                                            <p>Status:</p>
                                            </div>
                                        <div className="popup-view-detail popup-values">
                                            <span>{credit}</span>
                                            <span>{'Paid'}</span>
                                        </div>
                                </div>
                                   <div className="popup-main-view">
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Repayment Terms</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLendData.paymentTerm}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Lend Interval</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLendData.lendInterval}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Lend Duration</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLendData.lendDuration + " months"}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Lend Amount</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{'₱' + viewLendData.lendAmount}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Interest</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLendData.interest+"%"}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Total</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{'₱' + viewLendData.totalEarnings}</span>
                                            </div>
                                    </div>
                                   </div>
                                <button className="borrow-button" onClick={async function(){
                                    lendData.splice(viewLendData.index, 1) 
                                    setLendData(lendData)
                                    dbData['lendData'] = lendData
                                    try {
                                        await setDoc({
                                            collection: "users",
                                            doc: {
                                            key,
                                            data: dbData,
                                            version: version
                                        }
                                        }).then(()=>{
                                            setLendViewVisible(false)
                                            list()
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        
                                    }
                                }}>
                                    Withdraw
                                </button>
                            </div>
                        </div>
                  </div>
                )}
                {loanViewVisible && (
                    <div className="popup-overlay" >
                        <div className="popup-backdrop"onClick={(e) => {setLoanViewVisible(false)}}></div>
                        <div className="popup-content">
                            <div className="popup-title">
                                <h2>My Loans</h2>
                                <img src="./dashboard/exitBtn.png" alt=""onClick={()=> {setLoanViewVisible(false)}} />
                            </div>
                            <div  className="popup-main">
                                <p>
                                The My Loan section helps you manage and monitor your active loans. Here, you’ll find important information about your current loans, including due dates, outstanding balances, and repayment history.
                                </p>
                                <div className="popup-view-details">
                                        <div className="popup-view-detail">
                                            <p>Main Lender:</p>
                                            <p>Due Date: </p>
                                            </div>
                                        <div className="popup-view-detail popup-values">
                                            <span>Maria Jhoanna</span>
                                            <span>{viewLoanData.dueDate}</span>
                                        </div>
                                        <div className="popup-view-detail">
                                            <p>Credit:</p>
                                            <p>Status:</p>
                                            </div>
                                        <div className="popup-view-detail popup-values">
                                            <span>{credit}</span>
                                            <span>{'Pending'}</span>
                                        </div>
                                </div>
                                   <div className="popup-main-view">
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Repayment Terms</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLoanData.paymentTerm}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Loan Interval</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLoanData.loanInterval}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Loan Duration</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLoanData.loanDuration + " months"}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Loan Amount</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{'₱' + viewLoanData.loanAmount}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Interest</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{viewLoanData.interest+"%"}</span>
                                            </div>
                                    </div>
                                    <div className="popup-bottom">
                                            <div className="popup-left">
                                                <span>Total</span>
                                                <p>:</p>
                                            </div>
                                            <div className="popup-right">
                                                <span>{'₱' + viewLoanData.totalAmount}</span>
                                            </div>
                                    </div>
                                   </div>
                                <button className="borrow-button" onClick={async function(){
                                    loanData.splice(viewLoanData.index, 1) 
                                    setLoanData(loanData)
                                    dbData['loanData'] = loanData
                                    try {
                                        await setDoc({
                                            collection: "users",
                                            doc: {
                                            key,
                                            data: dbData,
                                            version: version
                                        }
                                        }).then(()=>{
                                            setLoanViewVisible(false)
                                            list()
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        
                                    }
                                }}>
                                    Deposit
                                </button>
                            </div>
                        </div>
                  </div>
                )}
            </div>)
    }
    
    
}
export default Dashboard;