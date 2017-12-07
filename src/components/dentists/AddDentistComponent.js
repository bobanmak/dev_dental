import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {addUser} from '../../actions/dentists';
import {getUserRoles} from '../../actions/dentists/role_actions';
import Layout from '../../routes/Layout'
import validator from 'validator';
import _ from 'underscore';
import {COUNTRIES_LIST} from '../../utils/countries'
import DentistToolbar from './toolbar'
// material-UI and styles

import TextField from 'material-ui/TextField';
import styles from './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddDentistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            countries: "",
            roles: "",
            redirect: false
        };

    }

    componentDidMount() {
        this.setState({countries: COUNTRIES_LIST})
        this.props.getUserRoles();
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

    renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
        <SelectField
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(value)}
            children={children}
            {...custom}/>
    )

    renderRoleValues(selectValues) {
        return _.map(selectValues, function (roles) {
            return <MenuItem key={roles.id} value={roles.id} primaryText={roles.role_name}/>
        })
    }

    renderCountryValues(selectValues) {
        return _.map(selectValues, function (country) {
            return <MenuItem key={country.id} value={country.name} primaryText={country.name}/>
        })
    }

    onSubmit(values) {
        this.props.addUser(this.props.token, values);
        setTimeout(function () {
            this.setState({redirect: true});
        }.bind(this), 3000);
    }

    render() {
        const {handleSubmit} = this.props;
        let message = null;
        if (this.props.dentist.message) {
            message = <Snackbar
                open={true}
                message={this.props.dentist.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />

        }
        return (
            <Layout title="MyAccountComponent page">
                <DentistToolbar />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.addDentist}>
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
                                            <Field name="country" component={this.renderSelectField}
                                                   label="Select Country">
                                                {this.renderCountryValues(this.state.countries)}
                                            </Field>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <Field
                                                label="Home Phone Number"
                                                name="phoneNumber"
                                                hint="Enter your Home Phone Number"
                                                component={this.renderField}/>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                                            <Field
                                                label="Mobile Number"
                                                name="mobileNumber"
                                                hint="Enter your Mobile Number"
                                                component={this.renderField}/>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                            <Field
                                                label="Licence Number"
                                                name="licence"
                                                hint="Enter your Licence Number"
                                                component={this.renderField}/>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-sm-6 col-xs-6">
                                            <Field name="role" component={this.renderSelectField} label="Select Role">
                                                {this.renderRoleValues(this.props.dentistRole)}
                                            </Field>
                                        </div>
                                    </div>

                                    <RaisedButton type="submit" label="Add New Dentist" primary={true}
                                                  fullWidth={true}/>
                                </form>
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
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
        if (!validator.isEmail(values.email)) {
            errors.email = 'Please enter correct email address'
        }
    } else {
        errors.email = "Please enter email";
    }

    if (values.password) {
        if (!validator.isLength(values.password, {min: 8, max: 15})) {
            errors.password = 'Password must be at least 8 characters'
        }
    }
    if (!values.password) {
        errors.password = "Please enter password";
    }
    if (values.licence) {
        if (!validator.isLength(values.licence, {min: 6, max: 6})) {
            errors.licence = 'Licence number must be exact 6 numbers'
            if (!validator.isInt(values.licence)) {
                errors.licence = 'Licence number must contain only numbers'
            }
        }
    }
    if (!values.licence) {
        errors.licence = "Please enter Licence Number";
    }
    //if errors is !empty there is something wrong
    return errors;
}
function mapStateToProps({dentistRole, dentist}) {
    return {dentistRole, dentist}
}
export default reduxForm({
    validate,
    form: 'AddDentistForm'
})(
    connect(mapStateToProps, {addUser, getUserRoles})(AddDentistComponent)
)