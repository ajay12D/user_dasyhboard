import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Singnup = () => {


     const [email, setEmail] = useState(null);
        const [password, setPassword] = useState(null);
        const [username, setUsername] = useState(null);

        const navigation = useNavigate();

    async  function theHandler(e){
                
          const response =  await axios.post('http://localhost:3000/api/signup',
                {
                    email: email,
                    password: password,
                    username: username
                }
             );
             console.log
             if(response.data){
              
                navigation('/signin')
             }
        }
         
    return (
      <div className="form">
                  <div className="heading">SIGN UP</div>
                  <form onSubmit={e => e.preventDefault()}>
                      <div>
                          <label htmlFor="e-mail">E-Mail</label>
                          <input type="email" id="e-mail" placeholder="Enter you mail" value ={email} onChange={(e) => {
                            setEmail(e.target.value)
                          }} />
                      </div>
            <div>
                          <label htmlFor="passsword">passsword</label>
                          <input type="password" id="password" placeholder="Enter your password" value ={password} onChange={(e) => {
                            setPassword(e.target.value)
                          }} />
                      </div>
            <div>
                          <label htmlFor="username">username</label>
                          <input type="text" id="username" placeholder="Enter your username" value ={username} onChange={(e) => {
                            setUsername(e.target.value)
                          }}/>
                      </div>
                      <button type="submit" onClick={theHandler}>
                          Submit
                      </button>
                  </form>
          </div>
    )
  }