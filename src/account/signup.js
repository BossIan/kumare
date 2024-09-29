import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Signup() {
  const openLink = () => {window.location.assign("./login")}
  const [ username, setUsername ] = useState(''); 
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const history = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/signup",{
        username, email, password
      }).then(res => {
        if (res.data) {
          history("/",{state:{id:email}})
        } else {
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
      <h1>Signup</h1>
      <form action='POST'>
        <input type="username" onChange={(e) => {
          setUsername(e.target.value)
        }} placeholder='Username'></input>
        <input type="email" onChange={(e) => {
          setEmail(e.target.value)
        }} placeholder='Email'></input>
        <input type="password" onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder='Password'></input>
        <input onClick={submit} type='submit'/>
      </form>
      <button onClick={openLink}>login</button>
    </div>
  );
}

export default Signup;