import axios from 'axios';
export const MY_ACCOUNT = 'my_account';
export const ADD_DENTIST = 'add_dentist';
export const GET_DENTISTS = 'get_dentist';

export function  myAccount(token){
    const request=axios.get('/api/v1/myAccount', {
        params: {
            utoken: token
        }
    })
    return {
        type: MY_ACCOUNT,
        payload: request
    }
}

export function  addDentist(values){
    const request= axios.post('/api/v1/register',values);
    return {
        type: USER_REGISTER,
        payload: request
    }
}

export function  getAllDentists(values){
    const request= axios.post('/api/v1/register',values);
    return {
        type: USER_REGISTER,
        payload: request
    }
}

export function  getUserRoles(values){
    const request= axios.post('/api/v1/register',values);
    return {
        type: USER_REGISTER,
        payload: request
    }
}

export function  setUserRoles(values){
    const request= axios.post('/api/v1/register',values);
    return {
        type: USER_REGISTER,
        payload: request
    }
}