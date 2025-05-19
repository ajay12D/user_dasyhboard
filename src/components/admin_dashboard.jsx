import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const admin_dBorad = () => {
    const [data, setData] = useState(null);

    const navigate = useNavigate();

 async function getData(){
  const response  = await axios.get('http://localhost:3000/api/user',{
         headers:{
            token: localStorage.getItem('token')
         }
       });

        if(response.data){
            setData(response.data);
        }
    }

    useEffect(() => {
        getData();
    },[]);

   async function inviteUser(){
   const response =   await axios.post('http://localhost:3000/api/invite',{}, {
         headers: {
            token: localStorage.getItem('token')
         }
      });

       if(response.data){
            navigate('/invited')
       }
    }

     return (
        <div>
            <h3>admin_username: {data?.usr?.username}</h3>
            <h3>admin_email: {data?.usr?.email}</h3>
            <button onClick={inviteUser}>invite_user</button>
            </div>
     )
}