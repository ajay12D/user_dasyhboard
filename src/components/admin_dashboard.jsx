import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThePayPalSripter from "./pay_pal_functionalty";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { admimAtom } from "../store/atoms/admin_atom.js";


export const admin_dBorad = () => {
    const [data, setData] = useState(null);
    const setAdmin = useSetRecoilState(admimAtom);

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

       if(response?.data?.admin?.is_admin){
 
           setAdmin(response?.data?.admin?.email);

            navigate('/invited')
       }
    }

     return (
        <div>
            <h3>admin_username: {data?.usr?.username}</h3>
            <h3>admin_email: {data?.usr?.email}</h3>
            <ThePayPalSripter />
            <button onClick={inviteUser}>invite_user</button>
            </div>
     )
}