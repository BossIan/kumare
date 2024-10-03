import { useState } from "react";
import axios from "axios"
import { GoogleLogin  } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";

function Signup() {
  const openLink = () => {window.location.assign("./login")}
  const [ username, setUsername ] = useState(''); 
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ googleLogin, setGoogleLogin] = useState(false);

  async function submit(e) {
    e?.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup",{
        username, email, password, googleLogin
      }).then(res => {
        alert(res.data)
        if (res.data === "exist") {
        } else if(res.data === "dontexist"){
          
        }
      }).catch(e => {
        alert("wrong details")
        console.log(e);
      })
    } catch (e) {
      console.log(e);
    }
  }
return (
    <div className="login">
      <h1>Signup</h1>
      <form action='POST'>
        <input type="username" onChange={(e) => {
          setUsername(e.target.value)
        }} placeholder='Username'></input>
        <input type="email" onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder='Email'></input>
        <input type="password" minLength="8" onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder='Password'></input>
        <input onClick={submit} type='submit'/>
      </form>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(jwtDecode(credentialResponse.credential).email);
          setUsername(jwtDecode(credentialResponse.credential).given_name)
          setEmail(jwtDecode(credentialResponse.credential).email)
          setPassword(".")
          setGoogleLogin(true)
          submit()
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        
      />;   
      <button onClick={openLink}>login</button>
    </div>
  );
}

export default Signup;