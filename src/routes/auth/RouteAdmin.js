import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

/**
 * Component that protects route from unauthorized users.
 * @type {Object}
 */
class RouteAdmin extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        canAccess: PropTypes.bool,
        isAdmin: PropTypes.bool,
        component: PropTypes.func,
        path: PropTypes.string,
        name: PropTypes.string,
        exact: PropTypes.bool,
        strict: PropTypes.bool
    }

    render() {
        let {canAccess,isAdmin, component, path,userData ,token, exact, strict} = this.props
        let authProps = {
            path,
            userData,
            isAdmin,
            token,
            exact,
            strict
        }
        console.log(isAdmin)
        return canAccess && isAdmin ?  <Route component={ () => {
                return renderMergedProps(component,this.props);
    }}/> : <Redirect to="/notAllowed" />
    }
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

export default RouteAdmin