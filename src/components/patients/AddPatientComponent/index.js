import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {addPatient} from '../../../actions/patients';
import Layout from '../../appShell/Layout'
import validator from 'validator';
import _ from 'underscore';
import {COUNTRIES_LIST} from '../../../utils/countries'
import PatientToolbar from '../toolbar'
import {withRouter} from 'react-router-dom'

// material-UI and styles
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui-icons/Close';
import {withStyles} from 'material-ui/styles';
import Select from 'material-ui/Select';
import styles from './styles';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
/**
 * AddDentistComponent
 * @description Component with form for adding new dentsits
 */
class AddPatientComponent extends Component {
    /**
     * constructor
     * @description Constructor for initialazing properties and state
     */
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            open: false,
            countries: "",
            roles: "",
            role: '',
            country: ''
        };

    }

    /**
     * componentDidMount
     * @description Will get countries and roles before the initial rendering
     */
    componentDidMount() {
        this.setState({countries: COUNTRIES_LIST})
        this.props.getUserRoles();
    }

    handleChange = input => event => {
        this.setState({[input.name]: event.target.value});
        input.onChange(event.target.value)
    };
    handleClick = () => {
        this.setState({open: true});
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({open: false});
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
            return <MenuItem key={country.code} value={country.name}>{country.name} </MenuItem>
        })
    }

    onSubmit(values) {

        this.props.addPatient(this.props.token, values);
        this.setState({open: true})
    }

    render() {
        const {handleSubmit, classes,patient,userData,history} = this.props;
        const{country,countries,open} = this.state
        let message = null;
        if (patient.message) {
            message = <Snackbar
                open={open}
                autoHideDuration={1000}
                onRequestClose={this.handleClose}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{patient.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
            if (patient.status !== 500 && patient.status !== 400) {
                setTimeout(function () {
                    history.push('/patients')
                }.bind(this), 1000);
            }
        }
        return (
            <Layout  userData={userData}>
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
                                    <Field name="country" stValue={country}
                                           component={this.renderSelectField}
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
                            <Button raised type="submit" color="primary"> Add new Patient </Button>
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
function mapStateToProps({ patient}) {
    return {patient}
}
export default withStyles(styles)(withRouter(reduxForm({
    validate,
    form: 'AddPatientForm'
})(
    connect(mapStateToProps, {addPatient})(AddPatientComponent)
)))