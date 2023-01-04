import "./sidebar.css"
import Closefriend from "../closefriend/Closefriend"
import { Users } from "../../Dynamic"

import { useMemo,memo } from "react"
import { RssFeed, Chat, PlayCircle, Group, Bookmark, HelpOutline, WorkOutline, InsertInvitation, School } from "@mui/icons-material"
function Sidebar() {
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className= "sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                     <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                         <span className="sidebarListItemText">Chats</span>
                    </li>
                     <li className="sidebarListItem">
                        <PlayCircle className="sidebarIcon"  />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                     <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                         <span className="sidebarListItemText">Group</span>
                    </li>
                     <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" /> 
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                     <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon"  />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <InsertInvitation className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                    <button className="sidebarButton">Show More</button>
                    <hr className="sidebarHr" />
                    <ul className="sidebarFriendList">
                        { Users.map((u)=>(
                        <Closefriend key={u.id} user = {u} />
                        )
                        )}
                    </ul>
            </div>
        </div>
    )
    
}
export default Sidebar