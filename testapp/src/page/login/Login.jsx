import "./login.css"
import {Context} from "../../context/Context";
import {loginCall} from "../../apiCalls";

import { useContext, useEffect, useRef } from "react"
import { useReducer } from 'react';
import {Link} from "react-router-dom"
import { useState } from "react";
export default function Login() {  

const {user, isFetching, error,errorMsg, dispatch} = useContext(Context)
const emailElement = useRef()
const passwordElement = useRef()


const  [ emailMsg , setEmailMsg] = useState("")
const  [ passwordMsg , setPasswordMsg] = useState("")


useEffect(()=>{
    switch (errorMsg?.data) {
        case "user not found":
            setEmailMsg(errorMsg.data)       
            break;
        default:
            setPasswordMsg(errorMsg)
            setEmailMsg("") 
            break;
    }
        

},[error])

const handleClick=  (e)=>{
    e.preventDefault()
    loginCall({email:emailElement.current.value,password:passwordElement.current.value,},dispatch)

}
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loinLeft">
                <h3 className="loginLogo">Tuandzsocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Tuandzsocial</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" className="loginInput" required  ref={emailElement}/><span className="errMsg" >{emailMsg}</span>
                    <input placeholder="Password" type="password" className="loginInput" required minLength= "6" ref={passwordElement}  /><span className="errMsg" >{passwordMsg}</span>
                    <button className="loginButton" type="submit" disabled = {isFetching}>{ isFetching ? "Loading..." : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <hr className="loginHr" />
                    <button className="loginRegisterButton" >
                    <Link to =  {"/register"} style={{textDecoration : "none", color :"white"}} >
                    <div style={{width :"100%",
                       height :"100%",
                       display :"flex",
                       alignItems :"center",
                       justifyContent :"center"}}>Create New Account</div>
                    </Link>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
