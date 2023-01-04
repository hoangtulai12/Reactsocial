import "./register.css"


import { useRef } from "react"
import { useNavigate,Link } from "react-router-dom"
import axios from "axios"
function Register() {
const usernameElement = useRef()
const emailElement = useRef()
const passwordElement = useRef()
const passwordAgainElement = useRef()
const navigate = useNavigate();
const handleClick = async (e) =>{
    e.preventDefault()
    if ( passwordElement.current.value !== passwordAgainElement.current.value ) {
        passwordAgainElement.current.setCustomValidity("Password don't match!")
    }
    else{
        const user = {
            username : usernameElement.current.value,
            email : emailElement.current.value,
            password : passwordElement.current.value
    
        }
        try {
            const res = await axios.post("/auth/register",user)
            navigate("/login")
        } catch (err) {
            console.log(err);
            
        }

    }
    

}
  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">Tuandzsocial</h3>
                <span className="registerDesc">
                    Connect with friends and the world around you on Tuandzsocial</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input
                    placeholder="Username"
                    type="text"
                    className="registerInput"
                    ref={usernameElement}
                    />
                    <input
                    placeholder="Email"
                    type="email"
                    className="registerInput"
                    ref={emailElement} />
                    <input
                    placeholder="Password"
                    type="password"
                    className="registerInput"
                    minLength={6}
                    ref={passwordElement} />
                    <input
                    placeholder="Password again"
                    type="password" 
                    className="registerInput"
                    ref={passwordAgainElement}  />
                    <button
                    className="signupButton"
                    type="submit"
                    >SignUp</button>
                    <button className="loginButtonRegister">
                    <Link to =  {"/login"} style={{textDecoration : "none", color :"white"}} >
                    <div style={{width :"100%", height :"100%" , display :"flex", alignItems :"center",justifyContent :"center"}}>Log into Account</div>
                    </Link>
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
export default  Register