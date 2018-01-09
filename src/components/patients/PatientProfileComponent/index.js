import React, {Component} from 'react';
import {connect} from  'react-redux';
import {getSinglePatient} from '../../../actions/patients';
import PatientToolbar from '../toolbar/index'
import Grid from 'material-ui/Grid';
import {withRouter} from 'react-router-dom';
import styles from './styles'
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Layout from '../../appShell/Layout'
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
/**
 * PatientProfileComponent
 * @description Component for displaying single patient data such as basic info,and data for that user
 */
class PatientProfileComponent extends Component {

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {user: '', token: '', openDeleteDialog: false, resMessage: '', data: [], open: true};
    }

    /**
     * componentDidMount
     * @description Get Dentist data from the backend before the component is rendered
     */
    componentDidMount() {
        const {token, userData, computedMatch} = this.props

        /**
         * @type {function}
         * @param {string} token
         * @description  Get All data from Dentist Reducer if token is provided
         */
        if (token && userData.user_id) this.props.getSinglePatient(token, computedMatch.params.id);
    }


    /**
     * render
     * @description Render whole DentistList view
     */
    render() {
        const {patient, userData, classes} = this.props;

        return (
            <Layout title="MyAccountComponent page" userData={userData}>
                <PatientToolbar />
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        Patient Info
                                    </Typography>
                                    <Typography component="ul">
                                        <Typography component="li">
                                            First Name : {patient.firstName}
                                        </Typography>
                                        <Typography component="li">
                                            Last Name : {patient.lastName}
                                        </Typography>
                                        <Typography component="li">
                                            Email : {patient.email}
                                        </Typography>
                                        <Typography component="li">
                                            Address : {patient.address}
                                        </Typography>
                                        <Typography component="li">
                                            City : {patient.city}
                                        </Typography>
                                        <Typography component="li">
                                            Country : {patient.country}
                                        </Typography>
                                        <Typography component="li">
                                            Phone Number : {patient.phoneNumber}
                                        </Typography>
                                        <Typography component="li">
                                            Mobile Number : {patient.mobileNumber}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        Past Appointments
                                    </Typography>
                                    <Typography component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                        ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button dense color="primary">
                                        Share
                                    </Button>
                                    <Button dense color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        Next Appointments
                                    </Typography>
                                    <Typography component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                        ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button dense color="primary">
                                        Share
                                    </Button>
                                    <Button dense color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        Avaliable Images
                                    </Typography>
                                    <Typography component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                        ranging
                                        across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button dense color="primary">
                                        Share
                                    </Button>
                                    <Button dense color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Layout>
        );
    }

}
/**
 * @type {function}
 * @param {object} patient
 * @description  Return patient data from the appropriate reducer
 * @return {object} patient
 */
function mapStateToProps({patient}) {
    return {patient}
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, {getSinglePatient})(PatientProfileComponent)))
