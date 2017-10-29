import {MY_ACCOUNT} from '../../actions/account_actions';

export default function(state={},action){
    switch (action.type){
        case MY_ACCOUNT:
            return action.payload.data;
        default:
            return state;
    }
}