import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Profile from "./page/profile/Profile";
import Register from "./page/register/Register";
import { Context } from "./context/Context";
import React, {  useState } from "react";
import { useContext,useEffect } from "react";
import { cloneUser } from "./context/action";
import { ContextProvider } from "./context/Context";
import {
    Routes ,
    Route,
    Link,
    Navigate
} from "react-router-dom";
function App() {
    const {user, dispatch} = useContext(Context)
    const userStorage = JSON.parse(localStorage.getItem("user"))
    useEffect (
      () => {
      const fetchUser = async ()=>{
          if (userStorage) {
          await dispatch(cloneUser(userStorage))
        }

      }
      fetchUser()
      },[]
    )
    return (
    <>{user || userStorage
      ?(<Routes>
        <Route path="/"  element = { <Home />} />
        <Route path="/login" element = {<Navigate  to ="/"/>}/>
        <Route path="/register" element = {user ? <Navigate  to ="/"/> :<Register />}/>
        <Route path="/profile/:username" element =  {userStorage !=null ? <Profile/> : <Navigate  to ="/"/> }  />
      </Routes>)
      :(<Routes>
            <Route path="/"  element = {<Login />} />
            <Route path="/login" element = {<Navigate  to ="/"/>}/>
            <Route path="/register" element = {<Register />}/>
            <Route path="/profile/:username" element =  {<Navigate  to ="/login/"/> }  />
        </Routes>)
    }
    </> 
  );
}   

export default App;
