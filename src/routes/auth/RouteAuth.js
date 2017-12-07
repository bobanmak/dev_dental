import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

/**
 * Component that protects route from unauthorized users.
 * @type {Object}
 */
class RouteAuth extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        canAccess: PropTypes.bool,
        component: PropTypes.func,
        path: PropTypes.string,
        name: PropTypes.string,
        exact: PropTypes.bool,
        strict: PropTypes.bool
    }

    render() {
        let {canAccess, component, path,userRoleID, token, exact, strict} = this.props
        let authProps = {
            path,
            userRoleID,
            token,
            exact,
            strict
        }

        return canAccess ?  <Route component={ () => {
                return renderMergedProps(component,this.props);
    }}/> : <Redirect to="/login" />
    }
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

export default RouteAuth