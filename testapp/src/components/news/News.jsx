import { useEffect, useState } from "react"
import axios from "axios"



import Post from "../post/Post"
import Share from "../share/Share"
import "./news.css"
import { Context } from "../../context/Context"
import { useContext } from "react"
function News({username}) {

    const [posts , setPosts] = useState([])
    const [text, setText] = useState ("")
    const {user} = useContext(Context)
    useEffect(()=>{
       const fetchPost = async() =>{
            const res = username 
             ? await axios.get("/posts/profile/"+ username)
             : await axios.get("posts/timeline/"+ user?._id)
            console.log(res);
           
            setPosts( res.data.sort((post1,post2)=>( new Date(post2.createdAt)- new Date(post1.createdAt))))
        }
        fetchPost()
    },[username,user?._id])
    
    return(
        
        <div className="news">
                <div className="newsWrapper">
                {username === user?.username && <Share/>}              
                {posts.map((p,i)=>{
                    return(
                    <Post key={i} post = {p} /> 
                )
                })}
                </div>

        </div>
    )
    
}
export default News