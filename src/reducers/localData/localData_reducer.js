import {LOCAL_AUTH_CHECK} from '../../actions/localData_actions';

export default function(state={},action){
    switch (action.type){
        case LOCAL_AUTH_CHECK:
            console.log(action.auth_data);
            return action.auth_data;
        default:
            return state;
    }
}