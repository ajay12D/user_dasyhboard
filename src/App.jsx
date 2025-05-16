import React from "react";
 import { Singnup } from "./components/signup.jsx";
 import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Singnin } from "./components/signin.jsx";
import {UserProfile} from "./components/user_dashboard.jsx";
import { User } from "./components/user.jsx";

export const App = () => {
  return(
<div>
  <BrowserRouter>
     <Routes>
     <Route path= "/signup" Component={Singnup}/>
      <Route path = "/signin" Component={Singnin}/>
      <Route path = "/profile" Component={UserProfile}/>
      <Route path = '/me'  Component = {User}/>
      </Routes>
  </BrowserRouter>
  </div> 
  )
  
};








