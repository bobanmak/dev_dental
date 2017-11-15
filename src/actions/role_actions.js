import axios from 'axios'

export const GET_ROLES = 'get_roles'
export const SET_ROLES = 'set_roles'

export function  getUserRoles(){
    const request= axios.get('/api/v1/role');
    return {
        type: GET_ROLES,
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