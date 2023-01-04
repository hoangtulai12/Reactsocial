import { createContext, useReducer} from "react"


import reducer from "./reducer"
const INIT_STATE = {
    user: null,
    isFetching : false,
    error : false,
    errorMsg : ""
}

const Context  = createContext(INIT_STATE)

const ContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(reducer,INIT_STATE)
    return(
        <Context.Provider value={{user:state.user, isFetching:state.isFetching, error:state.error,  errorMsg:state.errorMsg, dispatch}} >
            {children}
        </Context.Provider>
    )
}
export {ContextProvider, Context}
