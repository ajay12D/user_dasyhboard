import React, { useEffect, useState } from "react";
import axios from "axios";

export const UserProfile = () => {
    const [img,setImg] = useState();
    
    const [data, setData] = useState(null);
    const token = localStorage.getItem('token');

  
    useEffect(()=>{
        axios.get('http://localhost:3000/api/user',{
              
            headers:{
                token: token
            }
        }).then((res) => setData(res.data))
          .catch((err) => console.log('error in geting user'))
    },[])
      
    return (
        <>
        <div className="divi">
            <div>
              <h1> userInfo: {data?.usr?.username}</h1>
            </div> 
             <button style={{background:'blue',color: 'white'}}>update_img</button>
        </div>
        <div>
        <form method="POST" action="http://localhost:3000/api/upload_single" enctype="multipart/form-data">
    <div>
        <label>Upload multiple profile picture</label>
        <input type="file" name="profile-files" required multiple  />
    </div>
    <div>
        <input type="submit" value="Upload" />
    </div>
   </form>
        </div>
        </>
    )
};