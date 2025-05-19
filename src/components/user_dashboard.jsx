import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserProfile = () => {
  const [data, setData] = useState(null);
    const navigate =useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:3000/api/user',{
          
        headers:{
           token : localStorage.getItem('token')
        }
    }).then((res) => setData(res.data))
      .catch((err) => console.log('error in geting user'))
},[]);

  useEffect(() => {
     if(data?.add){
        navigate('/me')
     }
  }, [data])

    console.log(data?.add)
    return (
      <div>
 {data?.add?'loading':<TheProfile data = {data} />}
      </div>
    )
};

const TheProfile = (props) => {
  const [img,setImg] = useState();
  const Input = useRef()   
  const ref = useRef();
  const token = localStorage.getItem('token');
  const [displayData, setDisData] = useState(null);
  const [address, setAdres] = useState(null)

  const navigate = useNavigate()
  const inputBox = useRef();
 

  function theHandler() {
   
      const files = inputBox.current.files
    
      const formData = new FormData();
      for (let file of files) {
        formData.append('profile-files', file); // key must match multer field name
      }
    
      axios.post('http://localhost:3000/api/upload_single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token')
        },
      })
      .then(res =>setDisData(res.data.file.image))
      .catch(e => console.error(`error is:: ${e}`));

    }

       async function address_handler(){
        const address = Input.current.value;
        console.log(`address is`, address)
   const response = await axios.post("http://localhost:3000/api/usr_address",{
    address:address
   },
    {
      headers:{
        token:localStorage.getItem('token')
      }
    }
    );

    if(response.data){
      console.log(`user address addded`);
       navigate('/me')
    }
    else{
      console.log('user havnt addded the address')
    }
} ;

      


useEffect(() => {

  axios.get('http://localhost:3000/api/user_details',{

     headers: {
      token: localStorage.getItem('token')
      
     }
  }).then(res => setDisData(res.data.file.image))
  .catch(e => console.error(`error is :: ${e}`))
}, [])

      

 
    
  return (
      <>
      <div className="divi">
          <div>
            <h1> userInfo: {props.data?.usr?.username}</h1>
            <h1>useremail: {props.data?.usr.email}</h1>
            <img src = {`http://localhost:3000/uploads/${displayData}`}
                 height="100px" 
                 width= "100px"
                 />
           
          </div>
      </div>
      <div>
      <form  encType="multipart/form-data" onSubmit={e => e.preventDefault()}>
  <div>                                                                            
      <label>Upload profile picture</label>
      <input type="file" name="profile-files" required ref= {inputBox}  />
  </div> 
  <div>
      <input type="submit" value="Upload" onClick={theHandler} />
  </div>
  <div>
  <label htmlFor="address">address</label>
    <input type = "text" required ref ={Input} name = "address" />
    <button onClick={address_handler}>adress</button>
  </div>
 </form>
      </div>
      </>
  )
}

