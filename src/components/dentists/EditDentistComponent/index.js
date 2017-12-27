import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {updateUser} from '../../../actions/dentists';
import {getUserRoles} from '../../../actions/dentists/role_actions';
import Layout from '../../appShell/Layout'
import validator from 'validator';
import _ from 'underscore';
import {COUNTRIES_LIST} from '../../../utils/countries'
import DentistToolbar from '../toolbar/index'
import {withRouter} from 'react-router-dom'
// material-UI and styles

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import {withStyles} from 'material-ui/styles';
import Select from 'material-ui/Select';
import styles from './styles';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';

class EditDentistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: "",
            role: "",
            country: ""
        };

    }

    componentDidMount() {
        this.setState({countries: COUNTRIES_LIST})
        this.props.getUserRoles();


    }

    handleChange = input => event => {
        this.setState({[input.name]: event.target.value});
        input.onChange(event.target.value)
    };

    renderField(field) {
        return (
            <FormControl fullWidth error={field.meta.touched && field.meta.error ? true : false}>
                <InputLabel htmlFor="amount">{field.label}</InputLabel>
                <Input
                    fullWidth={true}
                    {...field.input}
                />
                <FormHelperText>{field.meta.touched ? field.meta.error : ""}</FormHelperText>
            </FormControl>
        )
    }

    renderSelectField = ({input, value, stValue, label, stateValue, meta: {touched, error}, children, ...custom}) => (
        <FormControl fullWidth className={styles.formControl} error={touched && error ? true : false}>
            <InputLabel htmlFor="role">{label}</InputLabel>
            <Select
                value={stValue}
                onChange={this.handleChange(input)}
                children={children}
                {...custom} />
            <FormHelperText>{touched && error}</FormHelperText>
        </FormControl>
    )

    renderRoleValues(selectValues) {
        return _.map(selectValues, function (roles) {
            return <MenuItem key={roles.id} value={roles.id}>{roles.role_name}</MenuItem>
        })
    }

    renderCountryValues(selectValues) {
        return _.map(selectValues, function (country) {
            return <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
        })
    }

    onSubmit(values) {
        const {token, initialValues} = this.props

        this.props.updateUser(token, values, initialValues.id);
    }

    render() {
        const {handleSubmit, initialValues, classes, dentist, userData, dentistRole} = this.props;
        const {country, role, countries} = this.state
        let message = null
        /*
         * hotfix for displaying country and role when redirected from DentistListComponent
         * */
        let initCountry = country === "" ? initialValues.country : country;

        let initRole = role === "" ? initialValues.user_role.role_id : role;

        if (dentist.message) {
            message = <Snackbar
                open={true}
                message={dentist.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
            setTimeout(function () {
                this.props.history.push('/dentists')
            }.bind(this), 1000);
        }
        return (
            <Layout  userData={userData}>
                <DentistToolbar />
                <div className={classes.root}>
                    <Paper className={classes.insertPaper} elevation={4}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Field
                                        label="Username"
                                        name="username"
                                        hint="Enter your Username"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        label="First Name"
                                        name="firstName"
                                        hint="Enter your First Name"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        label="Last Name"
                                        name="lastName"
                                        hint="Enter your Last Name"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Field
                                        label="Email"
                                        name="email"
                                        hint="Enter your email"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Field
                                        label="Password"
                                        name="password"
                                        hint="Enter your password"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        label="Street Address"
                                        name="address"
                                        hint="Enter your current living address"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        label="City"
                                        name="city"
                                        hint="Enter city"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field name="country" stValue={initCountry} component={this.renderSelectField}
                                           label="Select Country">
                                        {this.renderCountryValues(countries)}
                                    </Field>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Field
                                        label="Home Phone Number"
                                        name="phoneNumber"
                                        hint="Enter your Home Phone Number"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Field
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        hint="Enter your Mobile Number"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Field
                                        label="Licence Number"
                                        name="licence"
                                        hint="Enter your Licence Number"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Field name="role" component={this.renderSelectField} stValue={initRole}
                                           label="Select Role">
                                        {this.renderRoleValues(dentistRole)}
                                    </Field>
                                </Grid>
                            </Grid>
                            <Button raised type="submit" color="primary"> Edit Dentist </Button>
                        </form>
                    </Paper>
                    {message}
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
    if (!values.role) {
        errors.role = "Please provide role for this user";
    }
    //if errors is !empty there is something wrong
    return errors;
}
function mapStateToProps({dentistRole, dentist}, ownProps) {

    return {
        initialValues: ownProps.location.state.user,
        dentistRole,
        dentist
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, {updateUser, getUserRoles})(reduxForm({
    validate,
    form: 'EditDentistForms'
})(EditDentistComponent))))