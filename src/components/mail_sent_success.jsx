
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
 


export const OnSucessTask =() => {
     const [username, setUsername] = useState(null);
     const [dbUsers, setUsers] = useState([]);
     const [searchItem,setSItem] =useState('');
     const [filteredUsers, setFilterUser] = useState([]);
     const [data, setData] = useState(null);


     const debouncedItem = useDebounce(searchItem, 2000);

     useEffect(() =>{
        getUsers();
    },[]);
   
        async function getUsers(){
        const response = await axios.get('http://localhost:3000/api/all_users', {
            headers: {
               token: localStorage.getItem('token')
            }
         });
                if(response.data){
                    setUsers(response.data.data);
                    console.log(`the data`, response.data.data)
                }
                else{
                    console.error('users not found')
                }            
        }
        
   
      async function getSpecficUser(){
       const response =  await axios.post('http://localhost:3000/api/find_usr', {
            username: searchItem,
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
          if(response.data){
                  setData(response.data);
          }
      };


   useEffect(() => {
      getSpecficUser();
   },[debouncedItem])


   function handleInputChange(e){
      const searchTerm = e.target.value;
       setSItem(searchTerm);

       const filteredItems = dbUsers.filter((user) =>
           user.user.username&&user.address&&
        user?.user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        

       setFilterUser(filteredItems);
    }
    
    return (
        <div>
            
         <img src = {'src/assets/task-completed.png'}
          height= '300px'
         width= '300px'/>
         <h2>Mission Completed</h2>
         <div>
            <h2>username:{data?.user?.username}</h2>
            <h2>email:{data?.user?.email}</h2>
            <h2>adress: {data?.address}</h2>
            <input type = "search" name = "search" placeholder="Enter username"
             value= {searchItem} onChange={handleInputChange}/>
        </div>{filteredUsers?.length == 0
        ? <p>No users found</p>
        : <ul>
          {filteredUsers?.map(user => <li key={user._id}>
            <div>username: {user?.user?.username}</div>
            <div>address: {user?.address}</div>
          </li>)}
        </ul>}
        </div>
    )   
}