
const LOGIN_START = "loginstart"
const LOGIN_SUCCESS = "loginsuccess"
const LOGIN_FAILURE= "loginfailuere"
const FOLLOW= "follow"
const UNFOLLOW= "unfollow"
const CLONE_USER = "cloneUser"

const loginStart = (Userredential)=>(
    {
        type : LOGIN_START,
    }
    )


const loginSuccess = (user)=>(
    {
        type : LOGIN_SUCCESS,
        payload : user
    }

)
const loginFailure  = (error)=>(
    {
        type : LOGIN_FAILURE,
        payload : error
    }
    
)
const cloneUser = (user) =>(
    
        {
            type : CLONE_USER,
            payload : user
        }
    
)

const follow = (userId)=>(
    {
        type : FOLLOW,
        payload : userId
    }
    
)
const unFollow = (userId)=>(
    {

        type : UNFOLLOW,
        payload : userId
    }
    
)
export {loginFailure, loginStart, loginSuccess, cloneUser, follow, unFollow}
export {LOGIN_START, LOGIN_SUCCESS,LOGIN_FAILURE,FOLLOW, UNFOLLOW, CLONE_USER}
