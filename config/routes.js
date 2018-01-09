/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

var routes = {
    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    // the default sails homepage when creating a new app
    '/sailshomepage': {
        view: 'sailshomepage'
    },

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    //auth related routes
    'post /api/v1/login': 'AuthController.login',
    'post /api/v1/logout': 'AuthController.logout',
    'get /api/v1/token': 'AuthController.getToken',

    //user account backend routes
    'get /api/v1/users': 'User_accountController.getAllUsers',
    'get /api/v1/users/:id': 'User_accountController.getSingleAccount',
    'post /api/v1/users': 'User_accountController.createUser',
    'put /api/v1/users/:id': 'User_accountController.updateUser',
    'delete /api/v1/users/:id': 'User_accountController.deleteUser',


    //patients routes
    'get /api/v1/patients': 'PatientController.getAllPatients',
    'get /api/v1/patients/:id': 'PatientController.getSinglePatient',
    'post /api/v1/patients': 'PatientController.createPatient',
    'put /api/v1/patients/:id': 'PatientController.updatePatient',
    'delete /api/v1/patients/:id': 'PatientController.deletePatient',

    //user role related routes
    'get /api/v1/roles': 'RoleController.listRoles',

};

// the same app will be rendered at all these routes
var indexRoutes = ['/',
    '/login',
    '/my-account',
    '/dentists',
    '/dentist/add',
    '/dentist/edit',
    '/patients',
    '/patient/add',
    '/patient/edit',
    '/patient/:id',
    '/register',
    '/notAllowed',
    '/page1',
    '/page2'];
indexRoutes.forEach(function (r) {
    routes['GET ' + r] = 'IndexController.index';
});

module.exports.routes = routes;
