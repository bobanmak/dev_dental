
import {USER_REGISTER} from '../actions'
import {GET_ROLES} from '../actions/role_actions'
import {setCookie,GetCookie} from '../utils/cookies'

export default function(state={},action){
    switch (action.type){
        case USER_REGISTER:
            return action.payload.data
        case GET_ROLES:

            return action.payload.data
        default:
            return state;
    }
}