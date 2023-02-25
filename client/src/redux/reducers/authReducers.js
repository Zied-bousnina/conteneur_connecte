
import isEmpty from "../../utils/isEmpty"
import { SET_ERRORS, SET_USER, SET_LOADING } from "../types"

const initialState = {
    isConnected: false,
    isLoading: false,
   
    isAdmin: false,
    isMunicipal: false,
    isUser: false,
    isVerified: false,
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isConnected: !isEmpty(action.payload),
                user: action.payload,
                isLoading: isEmpty(action.payload),
                isAdmin: action.payload?.role === "ADMIN",
                isMunicipal: action.payload?.role === "MUNICIPAL",
                isUser: action.payload?.role === "USER",
                isVerified: action.payload?.verified,

            }
        
        default:
            return state
    }

}


