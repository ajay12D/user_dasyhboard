 import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThePayPalSripter from "./pay_pal_functionalty";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { admimAtom, statusAtom } from "../store/atoms/admin_atom.js";


export const admin_dBorad = () => {
    const [data, setData] = useState(null);
    const admin = useRecoilValue(admimAtom);
    const setAdmin = useSetRecoilState(admimAtom);
    const status = useRecoilValue(statusAtom);
    const setStatus = useSetRecoilState(statusAtom);
    

    const navigate = useNavigate();

 async function getData(){
  const response  = await axios.get('http://localhost:3000/api/user',{
         headers:{
            token: localStorage.getItem('token')
         }
       });

        if(response.data){
            setData(response.data);
            console.log(response?.data?.usr?.email)
            setAdmin(response?.data?.usr?.email)
        }
    }

    useEffect(() => {
        getData();
    },[]);

   async function inviteUser(){
   if(status){
    const response =   await axios.post('http://localhost:3000/api/invite',{}, {
        headers: {
           token: localStorage.getItem('token')
        }
     });

      if(response.data){
       console.log(response.data)
           navigate('/invited');
           setStatus(false);
      }
   }
    }

     return (
        <div>
            <h3>admin_username: {data?.usr?.username}</h3>
            <h3>admin_email: {admin}</h3>
            <ThePayPalSripter />
            <button onClick={inviteUser}>invite_user</button>
            </div>
     )
}