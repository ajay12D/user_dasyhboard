import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from "react";
import { Singnup } from "./components/signup.jsx";
import { Singnin } from "./components/signin.jsx";
import {UserProfile} from "./components/user_dashboard.jsx";
import { User } from "./components/user.jsx";
import { Admin_signup } from "./components/admin_signup.jsx";
import { admin_login } from "./components/admin_loigin.jsx";
import { admin_dBorad } from "./components/admin_dashboard.jsx";
import { UserInvited } from "./components/invite_tab.jsx";
import { OnSucessTask } from "./components/mail_sent_success.jsx";

export const App = () => {
  return(
<div>
  <BrowserRouter>
     <Routes>
     <Route path= "/signup" Component={Singnup}/>
     <Route path = "/admin_login" Component={admin_login} />
     <Route path = "/admin_dBorad" Component={admin_dBorad} />
     <Route path = "/invited" Component={UserInvited} />
     <Route path = "/" Component={Admin_signup}/>
      <Route path = "/signin" Component={Singnin}/>
      <Route path = "/profile" Component={UserProfile}/>
      <Route path = '/me'  Component = {User}/>
      <Route path = "/completed" Component={OnSucessTask} />
      </Routes>
  </BrowserRouter>
  </div> 
  )  
};








