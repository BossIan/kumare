import './landingPage.css';
function LandingPage() {
  const openLink = () => {window.location.assign("./login")}
    return (
    <div className="App">
      <header className="App-header">
        BIG MOM 
      </header>
      <button onClick={openLink}>Login</button>
    </div>
  );
}

export default LandingPage;
