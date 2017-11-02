import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from  'react-redux';
import {userRegister} from '../../../actions';
import {browserHistory} from 'react-router';

// material-UI and styles
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styles from './style.css';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  open: false};

    }
    componentDidMount(){

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
            <div>
                <Paper className={styles.register} zDepth={2}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="username"
                            name="username"
                            hint="Enter your username"
                            component={this.renderField}/>
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

                        <RaisedButton type="submit"  label="register" primary={true} fullWidth={true}/>
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
    if (!values.username) {
        errors.username = "Please enter username";
    }
    if (!values.email) {
        errors.email = "Please enter email";
    }
    if (!values.password) {
        errors.password = "Please enter password";
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
    connect(mapStateToProps,{userRegister})(RegisterComponent)
)