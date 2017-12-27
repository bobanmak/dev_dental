import React, {Component} from "react";
import Layout from "../../components/appShell/Layout";
import Grid from 'material-ui/Grid';
import styles from './styles'
import {withRouter} from 'react-router-dom'
import {withStyles} from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// material-UI and styles

class NotAllowedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: ""};
    }

    render() {
        const { classes ,userData} = this.props;
        return (
			<Layout userData={userData} title="MyAccountComponent page">
				<Grid container className={classes.root}>
					<Grid item xs={12}>
						<Grid
							container
							className={classes.demo}
							alignItems= 'center'
							direction='row'
							justify='center'
						>
							<Card className={classes.card}>
								<CardContent>
									<Typography className={classes.title}>Not Allowed Message</Typography>
									<Typography type="headline" component="h1" className={classes.errorText}>
										You are not allowed to use this Page
									</Typography>
									<Typography component="p">
										Please go back to the previous screen
									</Typography>
								</CardContent>
								<CardActions>
									<Button onClick={()=>{this.props.history.goBack()}}dense>Go back</Button>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Layout>
        );
    }

}

export default withRouter(withStyles(styles)(NotAllowedComponent));