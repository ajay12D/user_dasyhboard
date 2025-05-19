import React ,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const User= () => {
    const [mydata, setmyData] = useState('');
    const [img, setImg] = useState('');

    const navigate = useNavigate();

        useEffect(() => {
            axios.get('http://localhost:3000/api/me', {
                headers:{
                    token: localStorage.getItem('token')
                }

            })
            .then(res => setmyData(res.data))
              .catch(e => console.error(e))
        }, []);


      async  function theCsvGen(){
          const res =    await axios.post('http://localhost:3000/api/csv-genrater', {},{
            headers: {
                token: localStorage.getItem('token')
            }
          })

            if(res.data){
                 console.log('file is downloaded suceessfully and sent to user');
                 navigate('/completed')
            }
            else{
                console.log('file did not downloaded')
            }
        }
            

        return (
           <div>
            <h2>ussername: {mydata?.user?.username}</h2>
            <h2>user_email: {mydata?.user?.email}</h2>
            <h2>address: {mydata?.address?.address}</h2>
            <img src = {`http://localhost:3000/uploads/${mydata?.image?.image}`} 
            height= '100px' width='100px'/>
            <button onClick={theCsvGen}>genrate-csv</button>
           </div>
        )
};  