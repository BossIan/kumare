import { useEffect, useState } from "react";
import './creditScore.css'
import { value } from "./dashboard";
export const CreditScore = () => {
  const [val, setVal] = useState(0)
  const [valueDeg, setValueDeg] = useState((((value-450)/(850-450))*180))
  if (valueDeg < 0) {
    setValueDeg(0)
  }
  document.documentElement.style.setProperty(
    '--valueDeg',
    valueDeg+'deg'
  );
  if (val < value) {
    setTimeout(() => {
        setVal(val+1)
    }, 5); 
  }
  useEffect(function () {

  })
    return (
      <div className="creditScore">
      <h1>Your Credit Score</h1>
      <div className="half-circle">
        <p className="averageCredit">650</p>
        
          <div className="arrowRect"><div className="arrow"></div></div>
          <div className="inner-circle"></div>
          </div>
      <div className="creditScoreText">
          <p className="creditScoreVal">{val}</p>
          <p className="creditScoreName">Kumare</p>
          </div>
          <div className="lowerText">
        <p className="lowestCredit">450</p>
        <p className="highestCredit">850</p>
        </div>
      <div className="gradientRect"></div>
      <div className="tierList">
          <div className="tiers">
            <span>Kapitbahay</span>
            <p>0-450</p>
          </div>
          <div className="tiers">
            <span>Kumpare</span>
            <p>450-549</p>
          </div>
          <div className="tiers">
            <span>Kumare</span>
            <p>550-649</p>
          </div>
          <div className="tiers">
            <span>Katuwang</span>
            <p>650-749</p>
          </div>
          <div className="tiers">
            <span>Kasangga</span>
            <p>750-850</p>
          </div>
      </div>
      <div style={{color:`#878680`,marginTop:`auto`, fontSize:`1.1vw`, marginBottom:`5%`, cursor:`pointer`}}>Show Credit Details</div>
      </div>
    );
  };

