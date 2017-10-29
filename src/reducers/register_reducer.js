
import {USER_REGISTER} from '../actions';
import {setCookie,GetCookie} from '../utils/cookies';

export default function(state={},action){
    switch (action.type){
        case USER_REGISTER:
            if(action.payload.data.hasOwnProperty("token")){
                const token=action.payload.data.token;
                    setCookie("udata", JSON.stringify(action.payload.data), 1);
            }
            return action.payload.data;
        default:
            return state;
    }
}