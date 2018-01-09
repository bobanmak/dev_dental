/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
const jwt = require('jsonwebtoken');
const _ = require ('underscore')
module.exports = function (req, res, next) {

    const params = req.params.all();
    const jwttoken = params.utoken;
    var decoded = jwt.verify(jwttoken, sails.config.api_config.secret_key);
    console.log('isDentist')
    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (decoded && _.contains(decoded.roles, 'isDentist')) {
        return next();
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    res.status(403)
    return res.json({
        status: 403,
        message: 'You are not permitted to use this action',
    });
};
