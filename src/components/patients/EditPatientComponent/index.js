import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {updatePatient} from '../../../actions/patients';
import Layout from '../../appShell/Layout'
import validator from 'validator';
import _ from 'underscore';
import PatientToolbar from '../toolbar'
import {COUNTRIES_LIST} from '../../../utils/countries'
import {withRouter} from 'react-router-dom'
// material-UI and styles

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import {withStyles} from 'material-ui/styles';
import styles from './styles';
import Select from 'material-ui/Select';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';

class EditPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: "",
            country: ""
        };

    }

    componentDidMount() {
        this.setState({countries: COUNTRIES_LIST})

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

    renderCountryValues(selectValues) {
        return _.map(selectValues, function (country) {
            return <MenuItem key={country.code} value={country.name}>{country.name}</MenuItem>
        })
    }

    onSubmit(values) {
        const {token, initialValues} = this.props
        this.props.updatePatient(token, values, initialValues.id);
    }

    render() {
        const {handleSubmit, userData, classes, patient, initialValues} = this.props;
        const {country, countries} = this.state
        let message = null
        /*
         * hotfix for displaying country and role when redirected from DentistListComponent
         * */
        let initCountry = country === "" ? initialValues.country : country;

        if (patient.message) {
            message = <Snackbar
                open={true}
                message={patient.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
            setTimeout(function () {
                this.props.history.push('/patients')
            }.bind(this), 1000);
        }
        return (
            <Layout title="MyAccountComponent page" userData={userData}>
                <PatientToolbar />
                <div className={classes.root}>
                    <Paper className={classes.insertPaper} elevation={4}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container spacing={24}>

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
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        label="Street Address"
                                        name="address"
                                        hint="Enter your current living address"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        label="City"
                                        name="city"
                                        hint="Enter city"
                                        component={this.renderField}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                        label="Unique Identification Number"
                                        name="identificationNumber"
                                        hint="Enter patient Identification Number"
                                        component={this.renderField}/>
                                </Grid>
                            </Grid>
                            <Button raised type="submit" color="primary"> Edit Patient </Button>
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

    if (values.identificationNumber) {
        if (!validator.isLength(values.identificationNumber, {min: 6, max: 6})) {
            errors.identificationNumber = 'Licence number must be exact 6 numbers'
            if (!validator.isInt(values.identificationNumber)) {
                errors.identificationNumber = 'Licence number must contain only numbers'
            }
        }
    }

    if (!values.identificationNumber) {
        errors.identificationNumber = "Please enter Licence Number";
    }
    if (!values.role) {
        errors.role = "Please provide role for this user";
    }
    //if errors is !empty there is something wrong
    return errors;
}
function mapStateToProps({patient}, ownProps) {

    return {
        initialValues: ownProps.location.state.user,
        patient
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, {updatePatient})(reduxForm({
    validate,
    form: 'EditPatientForms'
})(EditPatientComponent))))
