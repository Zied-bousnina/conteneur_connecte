// contains all Redux reducers
import {combineReducers} from 'redux'
import  authReducer  from "./authReducers";
import  errorsReducer  from "./errorReducers";


export default  combineReducers({
    auth: authReducer,
    errors: errorsReducer,

    

})