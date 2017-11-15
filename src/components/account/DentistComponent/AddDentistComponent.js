import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {userRegister} from '../../../actions/index';
import {getUserRoles} from '../../../actions/role_actions';
import {browserHistory} from 'react-router';

import validator from 'validator';
import _ from 'underscore';
import {COUNTRIES_LIST} from '../../../utils/countries'
// material-UI and styles
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styles from '../style.css';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddDentistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            countries:""
        };

    }
    componentDidMount(){
        this.props.getUserRoles()
        this.setState({countries:COUNTRIES_LIST})
    }

    handleChange = (event, index, value) => {
        this.setState({value});
    };

    renderField(field) {
        return (
            <div>
            <TextField
                hintText={field.hint}
                floatingLabelText={field.label}
                errorText={field.meta.touched ? field.meta.error : ""}
                fullWidth={true}
                {...field.input}
             />
            </div>
        )
    }

    renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
        <SelectField
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(value)}
            children={children}
            {...custom}/>
            )

    renderRoleValues(selectValues){
        return _.map(selectValues,function(roles){
            return <MenuItem key={roles.id} value={roles.id} primaryText={roles.role_name} />
        })
    }

    renderCountryValues(selectValues){
        return _.map(selectValues,function(country){
            return <MenuItem key={country.id} value={country.name} primaryText={country.name} />
        })
    }

    onSubmit(values) {

        this.props.userRegister(values);
    }

    openDialog=()=>{
        this.setState({ open: true})
    }
    closeDialog=()=>{
        this.setState({ open: false})
    }

    render() {
        const {handleSubmit} = this.props;
        let message=null;
        if(this.props.register.message){
            message= <Snackbar
            open={true}
            message={this.props.register.message}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
        />
            this.props.register.message=null;
            if(this.props.register.logedIn){
                browserHistory.push('/');
            }
        }
        return (
                    <div className={styles.addDentist} >
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                        <Field
                                        label="Username"
                                        name="username"
                                        hint="Enter your Username"
                                        component={this.renderField}/>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                        <Field
                                            label="First Name"
                                            name="firstName"
                                            hint="Enter your First Name"
                                            component={this.renderField}/>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                        <Field
                                            label="Last Name"
                                            name="lastName"
                                            hint="Enter your Last Name"
                                            component={this.renderField}/>
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                        <Field
                                        label="Email"
                                        name="email"
                                        hint="Enter your email"
                                        component={this.renderField}/>
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                            <Field
                                        label="Password"
                                        name="password"
                                        hint="Enter your password"
                                        component={this.renderField}/>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6">
                                            <Field
                                        label="Street Address"
                                        name="streetAddress"
                                        hint="Enter your current living address"
                                        component={this.renderField}/>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6">
                                            <Field
                                                label="City"
                                                name="city"
                                                hint="Enter city"
                                                component={this.renderField}/>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6">
                                                <Field name="country" component={this.renderSelectField} label="Select Country" >
                                                    {this.renderCountryValues(this.state.countries)}
                                                </Field>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                        <Field
                                            label="Home Phone Number"
                                            name="homeNumber"
                                            hint="Enter your Home Phone Number"
                                            component={this.renderField}/>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <Field
                                                label="Mobile Number"
                                                name="mobileNumber"
                                                hint="Enter your Mobile Number"
                                                component={this.renderField} />
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" >
                                            <Field
                                                label="Licence Number"
                                                name="licenceNumber"
                                                hint="Enter your Licence Number"
                                                component={this.renderField} />
                                    </div>
                                    <div className="col-md-12 col-lg-12 col-sm-6 col-xs-6">
                                            <Field name="role" component={this.renderSelectField} label="Select Role" >
                                                {this.renderRoleValues(this.props.register)}
                                            </Field>
                                    </div>
                                </div>

                                <RaisedButton type="submit"  label="register" primary={true} fullWidth={true}/>
                            </form>

                        {message}
                    </div>

    );
    }

}
function validate(values) {

    const errors = {}
    //validate inputs from 'values'
    if (!values.username) {
        errors.username = "Please enter username";
    }
    if (values.email) {
        if( !validator.isEmail(values.email)){
            errors.email = 'Please enter correct email address'
        }
    }else{
        errors.email = "Please enter email";
    }

    if (values.password) {
        if( !validator.isLength(values.password,{min:8, max:15})){
            errors.password = 'Password must be at least 8 characters'
        }
    }
    if (!values.password) {
        errors.password = "Please enter password";
    }
    if (values.licenceNumber) {
        if( !validator.isLength(values.licenceNumber,{min:6, max:6}) ){
            errors.licenceNumber = 'Licence number must be exact 6 numbers'
            if(!validator.isInt(values.licenceNumber)){
                errors.licenceNumber = 'Licence number must contain only numbers'
            }
        }
    }
    if (!values.licenceNumber) {
        errors.licenceNumber = "Please enter Licence Number";
    }
    //if errors is !empty there is something wrong
    return errors;
}
function mapStateToProps({register}){
    return {register}
}
export default reduxForm({
    validate,
    form: 'RegisterForm'
})(
    connect(mapStateToProps,{userRegister,getUserRoles})(AddDentistComponent)
)