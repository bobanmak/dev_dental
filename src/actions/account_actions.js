import axios from 'axios';
export const MY_ACCOUNT = 'my_account';

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