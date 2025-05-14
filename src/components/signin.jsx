import React ,{useState}from "react";
import {   useNavigate } from "react-router-dom";
import axios from "axios";

export const Singnin = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigation = useNavigate();

  async function theHandler(){
     const res = await axios.post('http://localhost:3000/api/signin',{
      email: email,
      password: password
     });

     if(res.data.token){
      localStorage.setItem('token', res.data.token);
      navigation('/profile')
     }
  }

    return (
      <div className="form">
                  <div className="heading">SIGN IN</div>
                  <form onSubmit={(e) => e.preventDefault()}>
                      <div>
                          <label htmlFor="e-mail">E-Mail</label>
                          <input type="email" id="e-mail" placeholder="Enter you mail" value = {email} onChange={(e) => {
                            setEmail(e.target.value)
                          }}/>
                      </div>
            <div>
                          <label htmlFor="passsword">passsword</label>
                          <input type="password" id="password" placeholder="Enter your password" value = {password} onChange={(e) => {
                            setPassword(e.target.value)
                          }} />
                      </div>
                      <button type="submit" onClick={theHandler}>
                          Sign-in
                      </button>
                  </form>
          </div>
    )
  }
  