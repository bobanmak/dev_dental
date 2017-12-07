import axios from 'axios';
export const MY_ACCOUNT = 'my_account';
export const TOKEN_DATA = 'token_data';
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
export function  getTokenData(token){
    const request=axios.get('/api/v1/token', {
        params: {
            utoken: token
        }
    })
    return {
        type: TOKEN_DATA,
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

export function  getAllDentists(token){
    const request= axios.get('/api/v1/listUsers',{
        params: {
            utoken: token
        }
    });
    return {
        type: GET_DENTISTS,
        payload: request
    }
}

