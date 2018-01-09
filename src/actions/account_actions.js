import axios from 'axios';
export const MY_ACCOUNT = 'my_account';
export const TOKEN_DATA = 'token_data';


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

