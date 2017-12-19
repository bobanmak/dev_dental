import axios from 'axios';
export const GET_SINGLE_USER = 'get_single_user';
export const GET_ALL_USERS = 'get_all_users';
export const ADD_USER = 'add_user';
export const UPDATE_USER = 'update_user';
export const DELETE_USER = 'delete_user';


/**
 * @function :: getSingleUser
 *
 * @description :: Redux action for calling backend API /api/v1/users/:id which will get single user with given id
 * @param :: {number} id
 * @param :: {string} token
 * @returns :: {object} GET_SINGLE_USER
 */

export function getSingleUser(token, id) {
    const request = axios.get(`/api/v1/users/${id}`, {
        params: {
            utoken: token
        }
    })
    return {
        type: GET_SINGLE_USER,
        payload: request
    }
}

/**
 * @function :: getAllUsers
 *
 * @description :: Redux action for calling backend API /api/v1/users which will get all users
 * @param :: {number} id
 * @param :: {string} token
 * @returns :: {object} GET_SINGLE_USER
 */

export function getAllUsers(token) {
    const request = axios.get('/api/v1/users', {
        params: {
            utoken: token
        }
    })
    return {
        type: GET_ALL_USERS,
        payload: request
    }
}

/**
 * @function :: getAllUsers
 *
 * @description :: Redux action for sending user data in  backend API /api/v1/users/ which will add new user to the database
 * @param :: {object} values
 * @param :: {string} token
 * @returns :: {object} ADD_USER
 */

export function addUser(token, values) {

    const request = axios.post(`/api/v1/users/`, {
        utoken: token,
        values: values
    })

    return (dispatch) => {
        request.then(({data}) => {
            console.log(data)
            dispatch({type: ADD_USER, payload: data})
        }).catch((error) => {
            console.log(error)
            dispatch({type: ADD_USER, payload: error})
        });
    }

}

/**
 * @function :: updateUser
 *
 * @description :: Redux action for sending user data in  backend API /api/v1/users/:id which will update user with given api
 * @param :: {object} values
 * @param :: {string} token
 * @param :: {number} id
 * @returns :: {object} UPDATE_USER
 */

export function updateUser(token, values, id) {
    const request = axios.put(`/api/v1/users/${id}`, {
        utoken: token,
        values: values
    })
    return {
        type: UPDATE_USER,
        payload: request
    }
}

/**
 * @function :: deleteUser
 *
 * @description :: Redux action for deleting  user  in  backend API delete call /api/v1/users/:id
 * @param :: {string} token
 * @param :: {number} id
 * @returns :: {object} DELETE_USER
 */

export function deleteUser(token, id, callback) {
    const request = axios.delete(`/api/v1/users/${id}`, {
        params: {
            utoken: token
        }
    }).then((response) => callback(response))
    return {
        type: DELETE_USER,
        payload: request
    }
}

