
import {GET_SINGLE_USER,GET_ALL_USERS,ADD_USER,UPDATE_USER,DELETE_USER} from '../../actions/dentists'

export default function(state={},action){
    switch (action.type){
        case GET_SINGLE_USER:
            return action.payload.data
        case GET_ALL_USERS:
            return action.payload.data
        case ADD_USER:
            console.log(action.payload)
            return action.payload.data
        case UPDATE_USER:
            return action.payload.data
        default:
            return state;
    }
}