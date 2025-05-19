import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Admin_signup = () => {
const [data, setData] = useState(null);
const [email,setEmail] = useState(null);
const [username, setUser] = useState(null);
const [password, setPass] = useState(null);
const [is_admin, setAdmin] = useState(null);

const navigate = useNavigate()

async function theHandler(){
    const response = await axios.post('http://localhost:3000/api/signup', {
        email: email,
         password: password,
         username:username,
         is_admin: is_admin
    },);

     if(response.data){
          navigate('/admin_login')
     }
}
  return (
    <div className="form">
        <div className="heading">sign_up</div>
        <form onSubmit={(e)=> e.preventDefault()}>
                        <div>
                          <label htmlFor="e-mail">E-Mail</label>
                          <input type="email" id="e-mail" placeholder="Enter you mail" value ={email} onChange={(e) => {
                            setEmail(e.target.value)
                          }} />
                      </div> 
                     <div>
                          <label htmlFor="passsword">passsword</label>
                          <input type="password" id="password" placeholder="Enter your password" value ={password} onChange={(e) => {
                            setPass(e.target.value)
                          }} />  
                      </div>
                       <div>
                          <label htmlFor="username">username</label>
                          <input type="text" id="usrname" placeholder="Enter your username" value ={username} onChange={(e) => {
                            setUser(e.target.value)
                          }}/>
                      </div>
                      <div>
                        <label htmlFor="role">is_admin</label>
                        <input type="text" id = "role" placeholder="enter true or false" value={is_admin} 
                        onChange={(e) =>setAdmin(e.target.value)} />
                      </div>
                      <button onClick = {theHandler}>sign-up</button>
            </form>
    </div>
  )
}