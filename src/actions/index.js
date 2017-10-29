import axios from 'axios';
import {setCookie} from '../utils/cookies';
//action constants for usage -- TODO add them to different file
export const FETCH_POSTS = 'fetch_posts';
export const USER_LOGIN = 'user_login';
export const USER_REGISTER = 'user_register';


const ROOT_URL= '/api/v1/patient';

export function fetchPosts() {
    const request= axios.get(`${ROOT_URL}`);
    return{
        type:FETCH_POSTS,
        payload:request
    }

}

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

export function  userRegister(values){
    const request= axios.post('/api/v1/register',values);
    return {
        type: USER_REGISTER,
        payload: request
    }
}

