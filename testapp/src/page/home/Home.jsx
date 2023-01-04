import News from "../../components/news/News"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { Context } from "../../context/Context"
import "./home.css"

import {useContext} from "react"


function Home() {
    const {user} = useContext(Context)
    return(
        <>
        <Topbar />
        <div className="homeContainer">
        <Sidebar />
        <News username={user?.username} />
        <Rightbar />
        </div>
        </>

    )
}


export default Home