import {combineReducers} from 'redux';
import LoginReducer from './login_reducer';
import TokenDataReducer from './account/getTokenData_reducer'
import DentistReducer from './dentists'
import PatientReducer from './patients'
import DentistRoleReducer from './dentists/rolesReducer'
import myAccountReducer from './account/myAccount_reducer';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({

    login: LoginReducer,
    dentist: DentistReducer,
    patient:PatientReducer,
    dentistRole: DentistRoleReducer,
    myAccount: myAccountReducer,
    tokenData: TokenDataReducer,
    form: formReducer
});

export default rootReducer;