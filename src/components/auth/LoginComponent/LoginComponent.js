import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {userLogin} from '../../../actions';
import _ from 'underscore'
// material-UI and styles
import Paper from 'material-ui/Paper';
import { Redirect } from 'react-router'
import {FormControl, FormHelperText,FormControlLabel} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import styles from './style.css';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
class LoginComponent extends Component {
    constructor(props,contex) {
        super(props,contex);
        this.state = {open: false};

    }

    renderField(field) {
        return (
            <div>
                <FormControl fullWidth error={field.meta.touched && field.meta.error ? true : false}>
                    <InputLabel htmlFor="amount">{field.label}</InputLabel>
                    <Input
                        fullWidth={true}
                        {...field.input}
                    />
                    <FormHelperText>{field.meta.touched ? field.meta.error : ""}</FormHelperText>
                </FormControl>
            </div>

        )
    }

    keepMeLoged(field) {
        return (
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field.input}
                        />
                    }
                    label="Keep me logged in"
                />

            </div>
        )
    }

    onSubmit(values) {
        this.props.userLogin(values);
    }

    render() {
        //return to homepage if aut cookie exists
        //if(getCookie('udata'))  return( <Redirect to='/' />)

        const {handleSubmit} = this.props;
        let message = null;
        if (this.props.login.message) {
            message = <Snackbar
                open={true}
                message={this.props.login.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />

        }

        if(this.props.login.logged_in) {
            setTimeout(function () {
              window.location.href='/'
            }.bind(this), 1000);
        }

        return (
            <div>
                <Paper className={styles.login} elevation={2}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="email"
                            name="email"
                            hint="Please enter email"
                            component={this.renderField}/>
                        <Field
                            label="password"
                            name="password"
                            hint="Please enter password"
                            component={this.renderField}/>

                        <Field
                            name="keepMeLoged"
                            component={this.keepMeLoged}/>
                        <Button raised  type="submit"  color="primary"  className={styles.loginButton}>Log me in </Button>
                    </form>
                </Paper>
                {message}
            </div>
        );
    }

}
function validate(values) {
    const errors = {}
    //validate inputs from 'values'
    if (!values.email) {
        errors.email = "Please enter email";
    }
    if (!values.password) {
        errors.password = "Please enter password";
    }
    //if errors is !empty there is something wrong
    return errors;
}
function mapStateToProps({login}) {
    return {login}
}
export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(mapStateToProps, {userLogin})(LoginComponent)
)