
import {GET_ROLES} from '../../actions/dentists/role_actions'

export default function(state={},action){
    switch (action.type){
        case GET_ROLES:
            return action.payload.data
        default:
            return state;
    }
}