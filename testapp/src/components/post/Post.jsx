import "./post.css"
import { useState, useContext } from "react";
import { MoreVert } from "@mui/icons-material"
import { useEffect } from "react";
import axios from "axios";
import { format } from 'timeago.js';
import {Link} from "react-router-dom"
import { Context } from "../../context/Context";
import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";


function Post({post}){
    const [like, setLike] = useState(post.likes.length)
    const [Islike, setIsLike] = useState(false)
    const [user, setUser] = useState({})
    const {user : currentUser} = useContext(Context)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    console.log("re-render");


    useEffect( () => {
        setIsLike(post.likes.includes(currentUser?._id))
     },[currentUser?._id,post.likes]
)   
    useEffect(()=>{
        const fetchUser = async() =>{
             const res = await axios.get(`/users?userId=${post.userId}`)
             console.log(res);
             setUser(res.data)
         }
         fetchUser()
     },[post.userId])

    const likeHandle = () =>{   
        try {
              axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
            
        } catch (err) {
            
        }

        setLike(like => Islike ? like -1 : like +1)
        setIsLike(!Islike)
    }
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF +user.profilePicture : `${PF}person/noAvatar.png`} alt="postImg" className="postProfileImg"/>
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <div className="postOption">
                            <MoreVert/>
                        </div>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src= {PF+post.img} alt="postImg" className="postImg" />
                </div>
                <div className="postBot">
                    <div className="postBotLeft">
                        <img src={`${PF}like.gif`} alt="likeIcon" className="likeIcon" onClick={likeHandle} />
                        <img src={`${PF}love.gif`} alt="likeIcon" className="likeIcon" onClick={likeHandle} />
                        <img src={`${PF}haha.gif`} alt="likeIcon" className="likeIcon" onClick={likeHandle} />
                        <img src={`${PF}wow.gif`} alt="likeIcon" className="likeIcon" onClick={likeHandle} />
                        <img src={`${PF}angry.gif`} alt="likeIcon" className="likeIcon" onClick={likeHandle} />

                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBotRight">
                        <span className="postCommentText">{post?.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post