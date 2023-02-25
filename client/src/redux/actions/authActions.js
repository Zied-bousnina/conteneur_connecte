import axios from 'axios'
import { SET_EMAIL_SENT, SET_ERRORS, SET_LOADING, SET_USER } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { SetAuthToken } from '../../utils/SetAuthToken';
import jwt_decode from "jwt-decode"


export const registerUser =  (userData, navigation ) => (dispatch) => {
    
    
    axios.post('http://192.168.1.16:3000/api/users', userData)
        .then(async(res) => {
            dispatch({
                type: SET_ERRORS,
                payload: {}
            })
            console.log(res)
            setTimeout(() => {
                
                
                dispatch(setLoading(false));
                navigation.navigate('OTPVerifyEmail', {email:res?.data?.user?.email, userId:res?.data?.user?._id})
                
                dispatch(setLoading(true));
            }, 3000);
           
           
            

        })
        
        
        .catch( (err) =>{
            setTimeout(() => {
                // Make API call or other asynchronous operation
          
                dispatch(setLoading(false));
              }, 2000);
               dispatch({
                  type: SET_ERRORS,
                  payload: err?.response?.data
                })
            }
           
        
            
        )
}
export const verifyEmail = (userData, navigation)=>(dispatch)=> {
    
    axios.post('http://192.168.1.16:3000/api/users/verifyemail', userData)
    .then(async(res) => {
            dispatch({
                type: SET_EMAIL_SENT,
                payload: true
            });
            // dispatch(setLoading(true));
            setTimeout(() => {
                
                
                dispatch({
                    type: SET_ERRORS,
                    payload: {}
                    
                })
                navigation.navigate('Login', {email:res?.data?.user?.email})
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 4000);
            

        })
        
        
        .catch(async (err) => {
            setTimeout(() => {
                
                
                dispatch(setLoading(false));
            }, 2310);
            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
            })
           }
        
            
        )
}
export function setLoading(isLoading) {
    return {
      type: SET_LOADING,
      payload: isLoading,
    };
  }

export const resendOtp = (email)=>dispatch=> {
    axios.post('http://192.168.1.16:3000/api/users/resendotp', email)
    .then(async(res) => {
        console.log(res)
            dispatch({
                type: SET_EMAIL_SENT,
                payload: true
            });
            // dispatch(setLoading(true));
            setTimeout(() => {
                
                
                dispatch({
                    type: SET_ERRORS,
                    payload: {}
                    
                })
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 2310);


        })
        .catch(async (err) => {
            console.log(err)
            setTimeout(() => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err?.response?.data
                })
                dispatch({
                    type: SET_EMAIL_SENT,
                    payload: false
                });
            }, 2310);
              }
              )
}
            

        


export const setCurrentUser = (decoded) => {
    return {
        type: SET_USER,
        payload: decoded
    }
}


export const loginUser = (userData) => dispatch => {
    console.log("-------------------------------------------")
    console.log(userData)
    axios
        .post('http://192.168.1.16:3000/api/users/login', {email:userData.email, password:userData.password})
        .then(res => {
            // Save to localStorage
            const { token } = res.data
            // Set token to localStorage
            AsyncStorage.setItem('jwtToken', token)
            
            // Set token to Auth header
            SetAuthToken(token)
            // Decode token to get user data
            const decode = jwt_decode(token)
        // console.log(decode)
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => 
           { 
            console.log(err)
            dispatch({
                type: SET_ERRORS,
                payload: err?.response?.data
            })}
        )
}

export const LogOut = ()=>dispatch=>{
    AsyncStorage.removeItem("jwtToken")
    
    dispatch( {
        type: SET_USER,
        payload: {}
    })
    // dispatch({
    //     type: SET_PROFILE,
    //     payload:[]
    // })
    
}