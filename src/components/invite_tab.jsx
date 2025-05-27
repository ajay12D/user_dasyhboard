 import React, { useEffect, useState }  from "react";
import io from "socket.io-client";

import { PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"
import { useRecoilValue } from "recoil";
import { admimAtom } from "../store/atoms/admin_atom";
export const UserInvited = () => {

    const [user, setUser] = useState(false);
    const adminEmail = useRecoilValue(admimAtom);
    useEffect(() => {
        const socket = io.connect('http://localhost:3000')
    socket.on("registerd",(data)=>{
             setUser(true)
             console.log(data);
             alert('user created successfully');
    });

    },[]);
    
    return (
        <div>
            <img src =  {'/src/assets/user.png'}
             height= '300px'
             width =  '300px'/>
             <h2>USER INVITED</h2>
             <h3>admin is: {adminEmail}</h3>
            <PayPalScriptProvider >
                <PayPalIntigration/>
                </PayPalScriptProvider>

        </div>
    )
};

const PayPalIntigration = () => {
      return (
        <div>
            <PayPalButtons
            amount = "20.0" onSuccess = {(details, data) => {
                 // Handle successful payment here
            }}
             options = {{
                clientId: 'AcW7PI4nLXtoapfxKBD3utsXrYu5MqOHWl0BquhwT2tdHQAIjLSTOnrBn9_lx7c5-LrLH76pkdIQ9Zbl'
             }}
            />
        </div>
      )
}
