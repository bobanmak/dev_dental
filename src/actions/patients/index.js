import axios from 'axios';
export const GET_SINGLE_PATIENT = 'get_single_user';
export const GET_ALL_PATIENTS = 'get_all_patients';
export const ADD_PATIENT = 'add_patient';
export const UPDATE_PATIENT = 'update_patient';
export const DELETE_PATIENT = 'delete_patient';


/**
 * @function :: getSinglePatient
 *
 * @description :: Redux action for calling backend API /api/v1/users/:id which will get single user with given id
 * @param :: {number} id
 * @param :: {string} token
 * @returns :: {object} GET_SINGLE_PATIENT
 */

export function getSinglePatient(token, id) {
    const request = axios.get(`/api/v1/patients/${id}`, {
        params: {
            utoken: token
        }
    })
    return {
        type: GET_SINGLE_PATIENT,
        payload: request
    }
}

/**
 * @function :: getAllPatients
 *
 * @description :: Redux action for calling backend API /api/v1/users which will get all users
 * @param :: {number} id
 * @param :: {string} token
 * @returns :: {object} GET_SINGLE_PATIENT
 */

export function getAllPatients(token,dentist) {
    const request = axios.get('/api/v1/patients', {
        params: {
            utoken: token,
            dentist_id:dentist
        }
    })
    return (dispatch) => {
        request.then(({data}) => {
            console.log(data)
            dispatch({type: GET_ALL_PATIENTS, payload: data})
        }).catch((error) => {
            dispatch({type: GET_ALL_PATIENTS, payload: error.response, status: error.response.status})
        });
    }
}

/**
 * @function :: getAllPatients
 *
 * @description :: Redux action for sending user data in  backend API /api/v1/users/ which will add new user to the database
 * @param :: {object} values
 * @param :: {string} token
 * @returns :: {object} ADD_PATIENT
 */

export function addPatient(token, values) {

    const request = axios.post(`/api/v1/patients/`, {
        utoken: token,
        values: values
    })

    return (dispatch) => {
        request.then(({data}) => {
            dispatch({type: ADD_PATIENT, payload: data})
        }).catch((error) => {
            dispatch({type: ADD_PATIENT, payload: error.response, status: error.response.status})
        });
    }

}

/**
 * @function :: updatePatient
 *
 * @description :: Redux action for sending user data in  backend API /api/v1/users/:id which will update user with given api
 * @param :: {object} values
 * @param :: {string} token
 * @param :: {number} id
 * @returns :: {object} UPDATE_PATIENT
 */

export function updatePatient(token, values, id) {
    const request = axios.put(`/api/v1/patients/${id}`, {
        utoken: token,
        values: values
    })
    return {
        type: UPDATE_PATIENT,
        payload: request
    }
}

/**
 * @function :: deletePatient
 *
 * @description :: Redux action for deleting  user  in  backend API delete call /api/v1/users/:id
 * @param :: {string} token
 * @param :: {number} id
 * @returns :: {object} DELETE_PATIENT
 */

export function deletePatient(token, id, callback) {
    const request = axios.delete(`/api/v1/patients/${id}`, {
        params: {
            utoken: token
        }
    }).then((response) => callback(response))
    return {
        type: DELETE_PATIENT,
        payload: request
    }
}

