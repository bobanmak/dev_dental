
import {TOKEN_DATA} from '../../actions/account_actions';

export default function(state={},action){
    switch (action.type){
        case TOKEN_DATA:
            return action.payload.data;
        default:
            return state;
    }
}