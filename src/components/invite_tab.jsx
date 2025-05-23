import React, { useEffect, useState }  from "react";
import io from "socket.io-client";
import ReactJsAlert from "reactjs-alert";

export const UserInvited = () => {
      
    
    
    const [user, setUser] = useState(false);
    useEffect(() => {
        const socket = io.connect('http://localhost:3000')
    socket.on("registerd",(data)=>{
             setUser(true)
             console.log(data);
             alert('user created successfully');
    });
    },[])
    return (
        <div>
            <img src =  {'/src/assets/user.png'}
             height= '300px'
             width =  '300px'/>
             <h2>USER INVITED</h2>
        </div>
    )
}