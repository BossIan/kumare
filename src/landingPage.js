import './landingPage.css';
import { signIn, authSubscribe } from "@junobuild/core";
import { useEffect, useState, createContext } from 'react';
export var userContext;
function LandingPage() {
  function signInBtn() {
    
    if (user !== undefined && user !== null) {
      userContext = user
      window.location.assign("./dashboard")
    } else {
      signIn().then(function() {
        window.location.assign("./")
        userContext = user
        console.log(user);
        
        window.location.assign("./dashboard")
      });
    }
  }
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const sub = authSubscribe((user) => {
      setUser(user)
    });
    return() => sub();
  }, []);
    return (
    <div className="App">
      <header>
        <div className='header2'>
        <div className='headerDiv logo'>
        <img src='./landing page/logo.png' alt='logo'/>
        <h3>Kumare</h3>
        </div>
        <div className='headerDiv'>
          About
        </div>
        <div className='headerDiv'>
          How it Works
        </div>
        <div className='headerDiv'>
          Terms & Condition
        </div>
        <div className='headerDiv'>
          Privacy Policy
        </div>
        </div>
        <div className='headerDiv'>
          <button onClick={signInBtn}>
          Sign In <img src='./landing page/signIn.png' alt='signin'/>
          </button>
        </div>
      </header>
      <div className='firstDiv' style={{backgroundImage:  `url( '/landing page/background1.png')`}}>
        <h2>WELCOME TO KUMARE</h2>
        <h1>Where borrowing <br/>leads to <span style={{fontWeight:800, color:'#FF992D'}}>Earning</span></h1>
        <p>Discover how microlending can help you achieve your financial goals while <br/>providing you with the opportunity to earn as you borrow.</p>
        <button onClick={signInBtn}>
          <img src='./landing page/icplogo.png' alt='icplogo'/>
          Start Now with ICP
        </button>

      </div>
      <div className='secondDiv'>
        <div className='featuresDiv'>
          <img src='./landing page/feature1.png' alt='feature 1'/>
          <h2>Lower Interest Rates</h2>
          <p>Benefit from competitive interest rates designed to make borrowing affordable and manageable for everyone.</p>
        </div>
        <div className='featuresDiv'>
          <img src='./landing page/feature2.png' alt='feature 2'/>
          <h2>Decentralized Platform</h2>
          <p>Experience a lending process that is transparent, accessible and maximizing user empowerment.</p>
        </div>
        <div className='featuresDiv'>
          <img src='./landing page/feature3.png' alt='feature 3'/>
          <h2>Flexible Repayment Options</h2>
          <p>Choose from various repayment plans that fit your financial situation, allowing you to manage your loans with ease.</p>
        </div>
      </div>
      <div className="thirdDiv">
        <div className="image-content">
            <div className="image-placeholder"></div>
            <div className="image-placeholder"></div>
        </div>

        <div className="text-content">
            <h1>Fueling Community Growth and Economic Development</h1>
            <p><strong>Kumare is your trusted ally in microlending and blockchain solutions</strong></p>
            <p>Kumare aims to provide accessible microlending solutions with fair interest rates and flexible repayment
                terms, empowering individuals to regain control of their financial future without the fear of falling
                deeper into debt.</p>
            <a href="/" className="btn">Learn more</a>
        </div>
      </div>
      <div className='fourthDiv'>
        <h2 className='title'>Explore Projects</h2>
        <div className='projectsDiv'>
          <div className='project' style={{backgroundImage:  `url( '/landing page/project1.png')`}}>
            <h3>Crypto-backed <br/>Loan</h3>
          </div>
          <div className='project' style={{backgroundImage:  `url( '/landing page/project2.png')`}}>
            <h3>Insurance <br/>Protection</h3>
          </div>
          <div className='project' style={{backgroundImage:  `url( '/landing page/project3.png')`}}>
            <h3>Credit <br/>Building</h3>
          </div>
          <div className='project' style={{backgroundImage:  `url( '/landing page/project4.png')`}}>
            <h3>Access to <br/>Capital</h3>
          </div>
        </div>
      </div>
      <div className='fifthDiv'>
        <h1>Building futures, for a <br/>better tomorrow.</h1>
        <h2 className='title'>Social Development Goals</h2>
        <div className='circleDiv'>
          <div className='circle'></div>
          <img src='./landing page/circle1.png' alt='circle 1'/>
          <img src='./landing page/circle2.png' alt='circle 2'/>
          <img src='./landing page/circle3.png' alt='circle 3'/>
        </div>
        <div className='sdgDiv'>
          <div className='sdg'>
            <img src='/landing page/sdg1.png' alt='sdg1'/>
            <div className='text'>
              <h3>SDG 8: <br/>Decent Work and Economic Growth</h3>
              <p>Kumare is dedicated to fostering sustained economic growth through our microlending services. By providing accessible financial solutions with fair interest rates, we create opportunities for decent work and entrepreneurship, empowering individuals to enhance their livelihoods and strengthen their communities’ economic stability.</p>
            </div>
          </div>
          <div className='sdg'>
            <img src='/landing page/sdg2.png' alt='sdg2'/>
            <div className='text'>
            <h3>SDG 11: <br/>Sustainable Cities and Communities</h3>
              <p>Kumare is dedicated to fostering sustained economic growth through our microlending services. By providing accessible financial solutions with fair interest rates, we create opportunities for decent work and entrepreneurship, empowering individuals to enhance their livelihoods and strengthen their communities’ economic stability.</p>
            </div>
          </div>
          <div className='sdg'>
            <img src='/landing page/sdg3.png' alt='sdg3'/>
            <div className='text'>
            <h3>SDG 17: <br/>Partnerships For The Goals</h3>
              <p>We recognize that effective partnerships are vital for driving meaningful change. Kumare collaborates with diverse stakeholders, including technology, finance, and local communities, to foster innovation and maximize our social impact. Together, we strive to build a cooperative network that accelerates sustainable development.</p>
            </div>
              
          </div>
        </div>
      </div>
      <div className='spacer'></div>
      <div className="sixthDiv">
        <div className="image-container">
        </div>
        <div className="content">
            <h1 className='title'>Why Choose</h1>
            <h1 className="gradient-text">KUMARE</h1>
            <p>There are many variations of passages available but the majority have suffered alteration in some form by injected humor or random word which don’t look even.</p>
            <div className="feature">
                <div className="circle-icon icon-1">
                    <img src="./landing page/icon1.png" alt="Icon"/>
                </div>
                <div>
                    <h2>Blockchain-Powered Security</h2>
                    <p>Enjoy peace of mind with our blockchain-based technology that ensures secure, transparent, and fast transactions.</p>
                </div>
            </div>
            <div className="feature">
                <div className="circle-icon icon-2">
                    <img src="./landing page/icon2.png" alt="Icon 2"/>
                </div>
                <div>
                    <h2>Fair Interest Rates</h2>
                    <p>We offer competitive and transparent interest rates, ensuring you have access to financial support without the burden of excessive costs.</p>
                </div>
            </div>
            <div className="feature">
                <div className="circle-icon icon-3">
                    <img src="./landing page/icon3.png" alt="Icon 3"/>
                </div>
                <div>
                    <h2>Flexible Loan Options</h2>
                    <p>Choose from a variety of loan packages tailored to meet different financial needs, whether you're starting a small business or covering personal expenses.</p>
                </div>
            </div>
            <button className="discover-btn">Discover More</button>
        </div>
      </div>
      <div className='seventhDiv'>
      </div>
      <footer>
        
        <span className='allRights'><img src='./landing page/logo.png' alt='logo'/>© All rights Reserved 2024  </span>
        <span>Terms of Use | Privacy Policy</span>
        <div className='socials'>
        <a href='https://x.com'><svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5645 3.23901C12.5645 3.30282 12.5645 3.36662 12.5645 3.43042C12.5645 3.49422 12.5645 3.55802 12.5645 3.62183C12.5645 4.56974 12.3867 5.52677 12.0312 6.49292C11.6758 7.45907 11.154 8.33407 10.4658 9.11792C9.77767 9.90177 8.92318 10.5444 7.90234 11.0457C6.89062 11.5378 5.72396 11.7839 4.40234 11.7839C4.0013 11.7839 3.60482 11.7566 3.21289 11.7019C2.82096 11.6381 2.44043 11.5515 2.07129 11.4421C1.70215 11.3328 1.3444 11.2006 0.998047 11.0457C0.651693 10.8816 0.31901 10.6993 0 10.4988C0.11849 10.5079 0.234701 10.5147 0.348633 10.5193C0.462565 10.5238 0.578776 10.5261 0.697266 10.5261C1.36263 10.5261 1.99837 10.419 2.60449 10.2048C3.21061 9.99064 3.75977 9.69214 4.25195 9.30933C3.62305 9.2911 3.06478 9.09513 2.57715 8.72144C2.08952 8.34774 1.75456 7.87834 1.57227 7.31323C1.66341 7.32235 1.75228 7.33146 1.83887 7.34058C1.92546 7.34969 2.01888 7.35425 2.11914 7.35425C2.24674 7.35425 2.37435 7.34741 2.50195 7.33374C2.62956 7.32007 2.7526 7.295 2.87109 7.25854C2.21484 7.12183 1.66797 6.7937 1.23047 6.27417C0.792969 5.75464 0.574219 5.14396 0.574219 4.44214V4.41479C0.765625 4.51506 0.970703 4.59709 1.18945 4.66089C1.4082 4.72469 1.63151 4.76115 1.85938 4.77026C1.47656 4.51506 1.16895 4.17782 0.936523 3.75854C0.704102 3.33927 0.587891 2.87899 0.587891 2.37769C0.587891 2.11336 0.62207 1.86043 0.69043 1.6189C0.758789 1.37736 0.852214 1.15177 0.970703 0.942139C1.32617 1.37052 1.72266 1.76245 2.16016 2.11792C2.59766 2.47339 3.06706 2.78101 3.56836 3.04077C4.06966 3.30054 4.60286 3.50789 5.16797 3.66284C5.72396 3.81779 6.29818 3.90894 6.89062 3.93628C6.8724 3.8269 6.85645 3.71753 6.84277 3.60815C6.8291 3.49878 6.82227 3.3894 6.82227 3.28003C6.82227 2.8881 6.89518 2.5144 7.04102 2.15894C7.19596 1.81258 7.40332 1.50952 7.66309 1.24976C7.92285 0.98999 8.22591 0.78719 8.57227 0.641357C8.91862 0.486409 9.29232 0.408936 9.69336 0.408936C10.1035 0.408936 10.4886 0.490967 10.8486 0.655029C11.2087 0.819092 11.5208 1.03784 11.7852 1.31128C12.1133 1.25659 12.43 1.17 12.7354 1.05151C13.0407 0.933024 13.3301 0.791748 13.6035 0.627686C13.5033 0.955811 13.3438 1.25659 13.125 1.53003C12.9062 1.80347 12.6465 2.02677 12.3457 2.19995C12.6374 2.17261 12.9222 2.1202 13.2002 2.04272C13.4782 1.96525 13.7448 1.87183 14 1.76245C13.8086 2.045 13.5898 2.3116 13.3438 2.56226C13.0977 2.81291 12.8379 3.03849 12.5645 3.23901Z" fill="white"/>
        </svg></a>
        <a href='https://www.facebook.com/'><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5625 7.09644C13.5625 7.94409 13.4167 8.74618 13.125 9.50269C12.8333 10.2592 12.43 10.9337 11.915 11.5261C11.4001 12.1186 10.7962 12.6153 10.1035 13.0164C9.40169 13.4083 8.64974 13.6681 7.84766 13.7957V9.05151H9.41992L9.7207 7.09644H7.84766V5.82495C7.84766 5.55151 7.92513 5.30542 8.08008 5.08667C8.23503 4.86792 8.52214 4.75854 8.94141 4.75854H9.80273V3.09058C9.80273 3.09058 9.64323 3.07007 9.32422 3.02905C9.00521 2.98804 8.65885 2.96753 8.28516 2.96753C7.51042 2.96753 6.88835 3.19312 6.41895 3.64429C5.94954 4.09546 5.71484 4.74943 5.71484 5.6062V7.09644H3.99219V9.05151H5.71484V13.7957C4.91276 13.6681 4.16081 13.4083 3.45898 13.0164C2.76628 12.6153 2.16243 12.1186 1.64746 11.5261C1.13249 10.9337 0.729167 10.2592 0.4375 9.50269C0.145833 8.74618 0 7.94409 0 7.09644C0 6.15763 0.177734 5.27808 0.533203 4.45776C0.888672 3.63745 1.37402 2.91968 1.98926 2.30444C2.60449 1.68921 3.32227 1.20386 4.14258 0.848389C4.96289 0.49292 5.84245 0.315186 6.78125 0.315186C7.72005 0.315186 8.59961 0.49292 9.41992 0.848389C10.2402 1.20386 10.958 1.68921 11.5732 2.30444C12.1885 2.91968 12.6738 3.63745 13.0293 4.45776C13.3848 5.27808 13.5625 6.15763 13.5625 7.09644Z" fill="white"/>
        </svg>
        </a>
        <a href='https://pinterest.com'><svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.32812 0.27417C6.97526 0.27417 7.59505 0.378987 8.1875 0.588623C8.77995 0.807373 9.30176 1.11271 9.75293 1.50464C10.2041 1.89657 10.5664 2.36597 10.8398 2.91284C11.1133 3.46883 11.25 4.08407 11.25 4.75854C11.25 5.39657 11.168 6.03459 11.0039 6.67261C10.8398 7.31974 10.5846 7.89852 10.2383 8.40894C9.89193 8.91935 9.45443 9.33862 8.92578 9.66675C8.39714 9.98576 7.76823 10.1453 7.03906 10.1453C6.69271 10.1453 6.33268 10.061 5.95898 9.89233C5.58529 9.72371 5.31641 9.4799 5.15234 9.16089C4.83333 10.3914 4.59863 11.2504 4.44824 11.738C4.29785 12.2257 3.88086 12.9389 3.19727 13.8777C3.12435 13.905 3.08561 13.9187 3.08105 13.9187C3.0765 13.9187 3.05143 13.8914 3.00586 13.8367C2.97852 13.5815 2.95117 13.3263 2.92383 13.071C2.89648 12.8158 2.88281 12.5606 2.88281 12.3054C2.88281 11.8861 2.92383 11.4259 3.00586 10.9246C3.08789 10.4324 3.19043 9.93107 3.31348 9.42065C3.43652 8.91024 3.56185 8.41349 3.68945 7.93042C3.82617 7.43823 3.9401 6.98706 4.03125 6.5769C3.93099 6.36727 3.86263 6.14168 3.82617 5.90015C3.78971 5.65861 3.77148 5.42391 3.77148 5.19604C3.77148 4.64917 3.90365 4.22078 4.16797 3.91089C4.43229 3.60099 4.72624 3.41187 5.0498 3.34351C5.37337 3.27515 5.66732 3.33667 5.93164 3.52808C6.20508 3.71948 6.3418 4.03849 6.3418 4.48511C6.3418 5.02287 6.22103 5.54468 5.97949 6.05054C5.73796 6.5564 5.61719 7.06909 5.61719 7.58862C5.61719 7.94409 5.74251 8.23348 5.99316 8.45679C6.24381 8.68009 6.53776 8.79175 6.875 8.79175C7.34896 8.79175 7.74544 8.64136 8.06445 8.34058C8.37435 8.03979 8.625 7.67521 8.81641 7.24683C9.00781 6.81844 9.14453 6.36271 9.22656 5.87964C9.30859 5.39657 9.34961 4.97274 9.34961 4.60815C9.34961 4.12508 9.26758 3.6967 9.10352 3.323C8.93945 2.9493 8.71387 2.63485 8.42676 2.37964C8.13965 2.12443 7.79557 1.93302 7.39453 1.80542C7.0026 1.67782 6.57422 1.61401 6.10938 1.61401C5.5625 1.61401 5.05664 1.70516 4.5918 1.88745C4.12695 2.06974 3.72135 2.32723 3.375 2.65991C3.02865 2.99259 2.75977 3.39136 2.56836 3.8562C2.36784 4.31193 2.26758 4.81779 2.26758 5.37378C2.26758 5.90242 2.37467 6.3103 2.58887 6.59741C2.80306 6.88452 2.91016 7.09188 2.91016 7.21948C2.91016 7.32886 2.8737 7.51798 2.80078 7.78687C2.72786 8.05575 2.62305 8.19019 2.48633 8.19019C2.1582 8.19019 1.78678 7.92814 1.37207 7.40405C0.957357 6.87996 0.75 6.13485 0.75 5.1687C0.75 4.41219 0.909505 3.73315 1.22852 3.13159C1.54753 2.52092 1.9668 2.00594 2.48633 1.58667C3.00586 1.1674 3.60286 0.843831 4.27734 0.615967C4.94271 0.388103 5.6263 0.27417 6.32812 0.27417Z" fill="white"/>
        </svg>
        </a>
        <a href='https://instagram.com'><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_772)">
        <path d="M6.125 3.9519C6.5625 3.9519 6.97266 4.03394 7.35547 4.198C7.73828 4.36206 8.07096 4.58537 8.35352 4.86792C8.63607 5.15047 8.85938 5.48315 9.02344 5.86597C9.1875 6.24878 9.26953 6.65894 9.26953 7.09644C9.26953 7.52482 9.1875 7.93042 9.02344 8.31323C8.85938 8.69604 8.63607 9.03101 8.35352 9.31812C8.07096 9.60522 7.73828 9.83081 7.35547 9.99487C6.97266 10.1589 6.5625 10.241 6.125 10.241C5.69661 10.241 5.29102 10.1589 4.9082 9.99487C4.52539 9.83081 4.19043 9.60522 3.90332 9.31812C3.61621 9.03101 3.39062 8.69604 3.22656 8.31323C3.0625 7.93042 2.98047 7.52482 2.98047 7.09644C2.98047 6.65894 3.0625 6.24878 3.22656 5.86597C3.39062 5.48315 3.61621 5.15047 3.90332 4.86792C4.19043 4.58537 4.52539 4.36206 4.9082 4.198C5.29102 4.03394 5.69661 3.9519 6.125 3.9519ZM6.125 9.13354C6.6901 9.13354 7.17318 8.9353 7.57422 8.53882C7.97526 8.14233 8.17578 7.66154 8.17578 7.09644C8.17578 6.53133 7.97526 6.04826 7.57422 5.64722C7.17318 5.24618 6.6901 5.04565 6.125 5.04565C5.5599 5.04565 5.0791 5.24618 4.68262 5.64722C4.28613 6.04826 4.08789 6.53133 4.08789 7.09644C4.08789 7.66154 4.28841 8.14233 4.68945 8.53882C5.09049 8.9353 5.56901 9.13354 6.125 9.13354ZM10.1309 3.82886C10.1309 4.02938 10.0602 4.20028 9.91895 4.34155C9.77767 4.48283 9.60221 4.55347 9.39258 4.55347C9.19206 4.55347 9.02116 4.48283 8.87988 4.34155C8.73861 4.20028 8.66797 4.02938 8.66797 3.82886C8.66797 3.61922 8.73861 3.44377 8.87988 3.30249C9.02116 3.16121 9.19206 3.09058 9.39258 3.09058C9.60221 3.09058 9.77767 3.16121 9.91895 3.30249C10.0602 3.44377 10.1309 3.61922 10.1309 3.82886ZM12.209 4.56714C12.2272 4.82235 12.2409 5.18237 12.25 5.64722C12.25 6.10295 12.25 6.58374 12.25 7.0896C12.25 7.59546 12.25 8.08081 12.25 8.54565C12.2409 9.0105 12.2272 9.37052 12.209 9.62573C12.1908 10.1088 12.111 10.5668 11.9697 10.9998C11.8285 11.4327 11.5801 11.8269 11.2246 12.1824C10.8691 12.547 10.4749 12.7976 10.042 12.9343C9.60905 13.071 9.14648 13.1531 8.6543 13.1804C8.39909 13.1895 8.03906 13.1986 7.57422 13.2078C7.11849 13.2169 6.6377 13.2214 6.13184 13.2214C5.62598 13.2214 5.14062 13.2169 4.67578 13.2078C4.21094 13.1986 3.85091 13.1895 3.5957 13.1804C3.10352 13.1531 2.64323 13.071 2.21484 12.9343C1.78646 12.7976 1.38997 12.547 1.02539 12.1824C0.669922 11.8269 0.423828 11.4327 0.287109 10.9998C0.150391 10.5668 0.0683594 10.1088 0.0410156 9.62573C0.0227865 9.37052 0.0136719 9.0105 0.0136719 8.54565C0.00455729 8.08081 0 7.59546 0 7.0896C0 6.58374 0.00455729 6.09839 0.0136719 5.63354C0.0136719 5.17782 0.0227865 4.82235 0.0410156 4.56714C0.0683594 4.07495 0.150391 3.61239 0.287109 3.17944C0.423828 2.7465 0.669922 2.35229 1.02539 1.99683C1.38997 1.64136 1.78874 1.39299 2.22168 1.25171C2.65462 1.11043 3.11263 1.03068 3.5957 1.01245C3.85091 0.994222 4.21094 0.98055 4.67578 0.971436C5.14062 0.971436 5.62598 0.971436 6.13184 0.971436C6.6377 0.971436 7.11849 0.971436 7.57422 0.971436C8.03906 0.98055 8.39909 0.994222 8.6543 1.01245C9.14648 1.03979 9.60905 1.12183 10.042 1.25854C10.4749 1.39526 10.8691 1.64136 11.2246 1.99683C11.5801 2.36141 11.8285 2.75789 11.9697 3.18628C12.111 3.61467 12.1908 4.07495 12.209 4.56714ZM10.9102 10.7058C10.9831 10.5053 11.0378 10.2455 11.0742 9.92651C11.1107 9.6075 11.1357 9.27482 11.1494 8.92847C11.1631 8.58211 11.1654 8.24487 11.1562 7.91675C11.1562 7.58862 11.1562 7.31519 11.1562 7.09644C11.1562 6.86857 11.1562 6.59058 11.1562 6.26245C11.1654 5.93433 11.1631 5.59709 11.1494 5.25073C11.1357 4.90438 11.1107 4.57625 11.0742 4.26636C11.0378 3.94735 10.9831 3.68758 10.9102 3.48706C10.8008 3.21362 10.6458 2.97664 10.4453 2.77612C10.2448 2.5756 10.0078 2.42065 9.73438 2.31128C9.53385 2.23836 9.27409 2.18367 8.95508 2.14722C8.64518 2.11076 8.31706 2.08569 7.9707 2.07202C7.62435 2.05835 7.28711 2.05607 6.95898 2.06519C6.63086 2.06519 6.35286 2.06519 6.125 2.06519C5.90625 2.06519 5.63281 2.06519 5.30469 2.06519C4.97656 2.05607 4.63932 2.05835 4.29297 2.07202C3.94661 2.08569 3.61393 2.11076 3.29492 2.14722C2.97591 2.18367 2.71615 2.23836 2.51562 2.31128C2.24219 2.42065 2.00521 2.5756 1.80469 2.77612C1.60417 2.97664 1.45378 3.21362 1.35352 3.48706C1.27148 3.68758 1.21224 3.94735 1.17578 4.26636C1.13932 4.57625 1.11654 4.90438 1.10742 5.25073C1.09831 5.59709 1.09375 5.93433 1.09375 6.26245C1.10286 6.59058 1.10742 6.86857 1.10742 7.09644C1.10742 7.31519 1.10286 7.58862 1.09375 7.91675C1.09375 8.24487 1.09831 8.58211 1.10742 8.92847C1.11654 9.27482 1.13932 9.6075 1.17578 9.92651C1.21224 10.2455 1.27148 10.5053 1.35352 10.7058C1.46289 10.9792 1.61784 11.2139 1.81836 11.4099C2.01888 11.6059 2.2513 11.7585 2.51562 11.8679C2.71615 11.95 2.97591 12.0092 3.29492 12.0457C3.61393 12.0821 3.94661 12.1049 4.29297 12.114C4.63932 12.1231 4.97656 12.1277 5.30469 12.1277C5.63281 12.1186 5.90625 12.114 6.125 12.114C6.35286 12.114 6.63086 12.1186 6.95898 12.1277C7.28711 12.1277 7.62435 12.1231 7.9707 12.114C8.31706 12.1049 8.64518 12.0821 8.95508 12.0457C9.27409 12.0092 9.53385 11.95 9.73438 11.8679C10.0078 11.7585 10.2448 11.6036 10.4453 11.4031C10.6458 11.2026 10.8008 10.9701 10.9102 10.7058Z" fill="white"/>
        </g>
        <defs>
        <clipPath id="clip0_1_772">
        <rect width="14" height="14" fill="white" transform="matrix(1 0 0 -1 0 14.0964)"/>
        </clipPath>
        </defs>
        </svg>
        </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
