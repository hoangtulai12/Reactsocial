import { Users } from "../../Dynamic"
import Online from "../online/Online"
import "./rightbar.css"
import { Context } from "../../context/Context"
import { follow,unFollow } from "../../context/action"

import { AccessTimeFilled, Add,Remove } from "@mui/icons-material"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"




function Rightbar({user}) {
const PF = process.env.REACT_APP_PUBLIC_FOLDER
const [friends, setFriends] = useState([])
const {user : currentUser, dispatch} = useContext(Context)
const [followed, setFollowed] = useState(false)

useEffect (() => {
    console.log(currentUser?.followings,user?._id);
    setFollowed(currentUser?.followings.includes(user?._id))
},[user]
)



useEffect (() =>{
    const getFriends = async ()=>{
        try {
        const res = await axios.get("/users/friends/"+ user?._id)
        setFriends(res.data)
            
        } catch (err) {
            console.log(err);
    }
}
    getFriends()
},[user])

const handleClick = async () => {
    try {
       if(!followed){
        console.log(currentUser._id);
           await axios.put("/users/"+user._id+"/follow",{
               userId: currentUser._id
            })
            console.log("fl");
            dispatch(follow( user._id)) 
           } 
       else{
           await axios.put("/users/"+user._id+"/unfollow",{
               userId: currentUser._id
            })  
            dispatch(unFollow( user._id))   
            console.log("ufl");
  
           
       }
       
    } catch (err) {
       console.log(err);
    }
    setFollowed(!followed)
}



const HomeRightbar = ()=> {
        return(
        <div className="rightbar">
        <div className="rightbarWrapper">
        <div className="birthdayContainer">
            <img src={PF+"gift.png"} alt="birthdayImg" className="birthdayImg" />
            <span className="birthdayText"><b>Tuan Linh</b> and <b>3 other friends</b> have  a birthday today.</span>
        </div>
        <div className="rightbarAd">
        <img src= {PF+"ad.png" }alt="rightbarAdTmg" className="rightbarAdImg" />
        </div>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
        {Users.map((u)=>{
            return <Online key={u.id} user ={u} />})}
        </ul>
        </div>
        </div>
        
        )
            

}
function ProfileRighrbar() {

    return(
        <div className="rightbar">
        <div className="rightbarWrapper">
        {currentUser?.username !== user.username && (
            <button className="rightbarFollowButton"
            onClick={handleClick}>
            {followed ? "Un Follow" : "Follow"}
            {!followed ? <Add/> : <Remove />}    
            </button>
        )}
            <>
            </>
            <h4 className="rightbarTitle">Intro</h4>
            <div className="rightbarInfo">
                <div className="ribarinfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="ribarinfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="ribarinfoItem">
                    <span className="rightbarInfoKey">RelationShip:</span>
                    <span className="rightbarInfoValue">{ user.relationship === 1 ?"Single" : user.relationship === 2 ? "Married": "-"}</span>
                </div>
                <div className="ribarinfoItem">
                    <span className="rightbarInfoKey">Education:</span>
                    <span className="rightbarInfoValue">{user.education}</span>
                </div>

            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
                {friends.map((f)=>(
                <div key={f._id}  className="rightbarFollowing">
                <Link to ={`/profile/${f.username}`} style={{textDecoration : "none"}}>
                     <img src={ f.profilePicture ? PF+ f.profilePicture: `${PF}person/noAvatar.png`} alt="" className="rightbarFollowingImg" />
                     <span className="rightbarFollowingName">{f.username}</span>
                </Link>
                 </div> 
                ))}
               
            </div>
            </div>
        </div>
    )
    }    

    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ?<ProfileRighrbar /> : <HomeRightbar /> }
            </div>

        </div>
    )
}
export default Rightbar