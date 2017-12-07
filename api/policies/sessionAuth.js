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

module.exports = function (req, res, next) {

    const params = req.params.all();
    const jwttoken = params.utoken;
    var decoded = jwt.verify(jwttoken, sails.config.api_config.secret_key);

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (decoded) {
        req.session.tokenData = decoded;
        return next();
    }

    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to use this controller');
};
