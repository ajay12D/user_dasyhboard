import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";


export const Singnup = () => {
     const [email, setEmail] = useState(null);
        const [password, setPassword] = useState(null);
        const [username, setUsername] = useState(null);
        const [userotp, setOtp] = useState(null);
        const [userNum, setUserNum] = useState(null);
        const navigation = useNavigate();

    async function theHandler(e){
                
          const response =  await axios.post('http://localhost:3000/api/signup',
                {
                    email: email,
                    password: password,
                    username: username,
                    otp: userotp
                }
             );
             console.log
             if(response.data){
              const socket = io.connect('http://localhost:3000')
              socket.emit("signup", "creted_user");
              
                navigation('/signin')
             }
        }

     async function otpVerifier(){
      console.log('calling')
      const response =  await axios.post('http://localhost:3000/api/send_otp', {
            email: email,
            number: userNum
          });
          if(response.data.message){
            console.log(response.data.message)
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
                      <div>
                        <label htmlFor="number">number</label>
                        <input type = "text" id = "number" placeholder="Enter number" value = {userNum}
                           onChange = {e => setUserNum(e.target.value) } />
                      </div>
                      <div>
                      <label htmlFor="otp">otp</label>
                        <div style={{display: 'flex'}}>
                        <input type="text" id = "otp" placeholder="Enter otp" value = {userotp} 
                        onChange={(e) => setOtp(e.target.value)} />
                        <button 
                        style={{backgroundColor:"green",
                        width: '100px', marginLeft: '10px',
                         marginTop:'1px'}}  onClick={otpVerifier} >verify</button>
                        </div>
                      </div>
                      <button type="submit" onClick={theHandler}>
                          Submit
                      </button>
                  </form>
          </div>
    )
  }