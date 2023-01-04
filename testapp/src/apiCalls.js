
import axios from "axios"
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_START } from "./context/action"

const loginCall = async (Userredential, dispatch) => {
    dispatch({type :LOGIN_START})
    try {
        const res = await axios.post("auth/login",Userredential)
        const saveUser = JSON.stringify(res.data)
        console.log(res.data);
        localStorage.setItem("user",saveUser)
        dispatch( {type :LOGIN_SUCCESS , payload : res.data})
    } catch (err) {
        const errMsg = err.response.data
        dispatch( {type :LOGIN_FAILURE , payload : errMsg})

    }
}
export {loginCall}
