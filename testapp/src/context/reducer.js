import {FOLLOW, UNFOLLOW} from "./action"
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, CLONE_USER} from "./action"

const reducer = (state, actions) =>{
    switch (actions.type) {
        case LOGIN_START:
            return{
                user: null,
                isFetching : true,
                error : false
            }
            
        case LOGIN_SUCCESS:
            return{
                user: actions.payload,
                isFetching : false,
                error : false
            }
        case LOGIN_FAILURE:
            return{
                user: null,
                isFetching : false,
                error : true,
                errorMsg : actions.payload
            }
        case CLONE_USER:  
        console.log(actions.payload);      
            return{
                user : actions.payload,
                isFetching : false,
                error : false
                }                                
            case FOLLOW:
            console.log(actions.payload);

            return{
                ...state,
                user : {
                    ...state.user,
                    followings : [...state.user.followings, actions.payload]
                }
                }
        case UNFOLLOW:
            console.log(actions.payload);

            const  newfollowings = state.user.followings.filter((f)=>(f !== actions.payload))
             return{
                ...state,
                user : {
                     ...state.user,
                    followings : newfollowings
                }
                }
        default:
            // throw new.console.error("sss");
            return state
    }

}

export default reducer