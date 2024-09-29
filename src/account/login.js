import './login.css';
import { useState } from "react";
import axios from "axios"

function Login() {
  const openLink = () => {window.location.assign("./signup")}
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/login",{
        username, password
      }).then(res => {
        if (res.data === "exist") {
          alert("user exists!")
        } else if(res.data === "dontexist"){
          alert("User doesn't exists")
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
      <h1>Login</h1>
      <form action='POST'>
        <input type="username" onChange={(e) => {
          setUsername(e.target.value)
        }} placeholder='Email'></input>
        <input type="password" onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder='Password'></input>
        <input onClick={submit} type='submit'/>
      </form>
      <button onClick={openLink}>Sign Up</button>
    </div>
  );
}

export default Login;