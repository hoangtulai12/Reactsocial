import "./topbar.css"
import { Context } from "../../context/Context"
import { logOut } from "../../context/action"

import { Search, Person,Chat, Notifications } from "@mui/icons-material"
import { Link} from "react-router-dom"
import { useContext, useState } from "react"

function Topbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const{user, dispatch} = useContext(Context)
    const [aboutBar, setAboutBar] = useState(false)
    const handleAboutBar = (e) =>{
        setAboutBar(!aboutBar)
    }
    const handleLogout =  (e)=>{
        localStorage.removeItem("user")
        window.location.reload()
    }

    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to = "/" style={{textDecoration : "none"}}>
                <span className="logo">Tuandzsocial</span>
                </Link>
                
            </div>  
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">HomePage</span>
                     <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadger">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadger">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadger">4</span>
                    </div>
                </div>
                { aboutBar &&(
                <div className="aboutBar">
                    <ul>
                         <Link to = {`/profile/${ user.username}`} style={{textDecoration : "none", color :"white"}} >
                         <li>Profile</li> 
                         </Link>
                         <li>

                        <button onClick={handleLogout}>Log Out</button>
                         </li>
                    </ul>
                </div>)
                }
                <img 
                src={user?.profilePicture ? PF +user.profilePicture : `${PF}person/noAvatar.png` }
                alt="person" 
                onClick={handleAboutBar}
                className="topbarImg" />
            </div>
                

        </div>
    )
}
export default Topbar