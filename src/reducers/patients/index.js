
import {GET_SINGLE_PATIENT,GET_ALL_PATIENTS,ADD_PATIENT,UPDATE_PATIENT} from '../../actions/patients'

export default function(state={},action){
    switch (action.type){
        case GET_SINGLE_PATIENT:
            let getSinglePatientData = action.payload.status==500 || action.payload.status==400 ? action.payload.data : action.payload
            return getSinglePatientData
        case GET_ALL_PATIENTS:
            let getPatientData = action.payload.status==500 || action.payload.status==400 ? action.payload.data : action.payload
            return getPatientData
        case ADD_PATIENT:
            let addPatientData = action.payload.status==500 || action.payload.status==400 ? action.payload.data : action.payload
            return addPatientData
        case UPDATE_PATIENT:
            return action.payload.data
        default:
            return state;
    }
}