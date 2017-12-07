import {combineReducers} from 'redux';
import LoginReducer from './login_reducer';
import LocalDataReducer from './localData/localData_reducer';
import TokenDataReducer from './account/getTokenData_reducer'
import DentistReducer from './dentists'
import DentistRoleReducer from './dentists/rolesReducer'
import myAccountReducer from './account/myAccount_reducer';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    localData: LocalDataReducer,
    login: LoginReducer,
    dentist: DentistReducer,
    dentistRole: DentistRoleReducer,
    myAccount: myAccountReducer,
    tokenData: TokenDataReducer,
    form: formReducer
});

export default rootReducer;