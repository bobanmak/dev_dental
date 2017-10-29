import { combineReducers } from 'redux';
import LoginReducer from './login_reducer';
import LocalDataReducer from './localData/localData_reducer';
import RegisterReducer from './register_reducer';
import myAccountReducer from './account/myAccount_reducer';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    localData: LocalDataReducer,
    login: LoginReducer,
    register: RegisterReducer,
    myAccount:myAccountReducer,
    form: formReducer
});

export default rootReducer;