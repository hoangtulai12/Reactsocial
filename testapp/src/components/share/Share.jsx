import "./share.css"
import { Context } from "../../context/Context"


import {PermMedia, LocalOffer, LocationOn, EmojiEmotions, Cancel} from "@mui/icons-material"
import { useContext ,useState , useRef, useEffect} from "react"
import axios from "axios"
function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(Context)
    const desc = useRef()
    const [file , setFile] = useState(null)

    
    
    const submitHandle =  async(e) => {
      e.preventDefault()
      const newPost = {
        userId : user._id,
        desc : desc.current.value

      }
      if(file) {     
        const data = new FormData()
        const fileName = Date.now()+file.name
        data.append("file",file)
        data.append("name", fileName)
        console.log(fileName);
        try {
            const res = await axios.post("/upload",data)            
             newPost.img = res.data
        } catch (err) {
            console.log(err);
        }
      }
      try{
        await  axios.post("/posts",newPost)
        window.location.reload()
      }
      catch(err){
        console.log(err);
      }
    }
    
    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user?.profilePicture ? PF + user?.profilePicture : `${PF}person/noAvatar.png`} alt="shareIMG" className="shareProfileImg" />
                    <input
                    placeholder={"What's in your mind "+user?.username+" ?"}
                    type="text" 
                    ref = {desc}
                    className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancleImg"  onClick = {()=> setFile(null)} ></Cancel>
                    </div>
                )}
                <form className="shareBot"
                onSubmit={submitHandle} >
                    <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo/Video</span>
                        <input 
                        type="file" 
                        id = "file"  
                        style={{display : "none"}} 
                        accept = ".png,.jpg,.jpeg"
                        onChange={ (e) =>{setFile(e.target.files[0])}}/>
                    </label>
                    <div className="shareOption">
                        <LocalOffer htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                        <input 
                        type="file" 
                        id = "file"  
                        style={{display : "none"}} 
                        accept = ".png,.jpg,.jpeg"/>
                    </div>
                    <div className="shareOption">
                        <LocationOn htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="gold" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                    </div>                  
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
    
}
export default Share