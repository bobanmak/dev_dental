import axios from 'axios'

export const GET_ROLES = 'get_roles'


/**
 * @function :: getUserRoles
 *
 * @description :: Redux action for retriving all avaliable roles for dentists
 * @returns :: {object} GET_ROLES
 */

export function  getUserRoles(){
    const request= axios.get('/api/v1/role');
    return {
        type: GET_ROLES,
        payload: request
    }
}
