import "./profile.css"
import News from "../../components/news/News"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"

import { useEffect, useState} from "react"
import axios from "axios"
import { useParams } from "react-router"

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const params = useParams().username
 
  useEffect(()=>{
    const fetchUser = async() =>{
    const res = await axios.get(`/users?username=${params}`)
         console.log(res);
         setUser(res.data)
     }
     fetchUser()
 },[params])
 

  return (
        <>
        <Topbar />
        <div className="profile">
        <Sidebar />
            <div className="profileRight">
            <div className="profileRightTop">
            <div className="profileCover">
            <img src={user.coverPicture ? PF +user.coverPicture : `${PF}person/noCover.png`} alt="profilecoverImg" className="profilecoverImg" />
            <img src={user.profilePicture ? PF +user.profilePicture : `${PF}person/noAvatar.png`} alt="profileUserImg" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfodesc">{user.desc}</span>
            </div>
            </div>
            <div className="profileRightBot">
            <News username = {params} />
            <Rightbar user ={user} />
            </div>
            </div>
        </div>

        </>
  )
}
export default Profile