
import {USER_LOGIN} from '../actions';
import {setCookie, getCookie } from '../utils/cookies';

export default function(state={},action){
    switch (action.type){
        case USER_LOGIN:
            if(action.payload.data.hasOwnProperty("token")){
                const data=action.payload.data;
                if(getCookie("keepMeLoged")){
                    setCookie("udata", JSON.stringify(data), 10);
                }else{
                    setCookie("udata", JSON.stringify(data), 1);
                }

            }
            return action.payload.data;
        default:
            return state;
    }
}