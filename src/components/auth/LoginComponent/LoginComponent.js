import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {userLogin} from '../../../actions';
import {Redirect} from 'react-router-dom';
import _ from 'underscore'
// material-UI and styles
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styles from './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};

    }

    componentDidMount() {

    }

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

    keepMeLoged(field) {
        return (
            <div>
                <Checkbox
                    label="Keep Me loged In"
                    {...field.input}
                />
            </div>
        )
    }

    onSubmit(values) {
        this.props.userLogin(values);
    }

    openDialog = () => {
        this.setState({open: true})

    }
    closeDialog = () => {
        this.setState({open: false})
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

            this.props.login.message = null;
            //
        }
        if(!_.isEmpty(this.props.login)) return( window.location.href="/")
        //redirect to homepage if succesfully loged in
        //if(this.props.login.logged_in)  return(<Redirect to='/' />)

        return (
            <div>
                <Paper className={styles.login} zDepth={2}>
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
                        <RaisedButton type="submit" label="Login" primary={true} fullWidth={true}/>
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