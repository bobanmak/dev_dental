import axios from 'axios';
import {setCookie} from '../utils/cookies';
//action constants for usage -- TODO add them to different file
export const USER_LOGIN = 'user_login';
export const USER_REGISTER = 'user_register';


export function  userLogin(values){
    if(values.hasOwnProperty("keepMeLoged")){
        setCookie("keepMeLoged" ,values.keepMeLoged ,10);
    }
    const request= axios.post('/api/v1/login',values);
    return {
        type: USER_LOGIN,
        payload: request
    }
}

