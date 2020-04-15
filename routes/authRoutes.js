'use strict';
/** Express router providing auth related routes
 * @module routes/userRoutes
 * @requires express
 */

/**
 * express Module
 * @const
*/
const express = require('express');

/**
 * Express router to mount auth related functions on.
 * @type {object}
 * @const
 * @namespace authRouter
 * @requires service/passport
 * @requires controllers/authController
 */
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Route signing up
 * @name 01-/signup
 * @route {POST} /signup
 * @memberof module:routes/authRoutes~authRouter
 * @bodyparam {String} licence
 * @bodyparam {String} firstName
 * @bodyparam {String} lastName
 * @bodyparam {String} gender
 * @bodyparam {String} birthdate
 * @bodyparam {String} email
 * @bodyparam {String} password
 */
    router.route('/signup')
        .post(authController.signUpAction);

        /**
 * Route signing in
 * @name 02-/signin
 * @route {POST} /signin
 * @memberof module:routes/authRoutes~authRouter
 * @bodyparam {String} email
 * @bodyparam {String} password
 */
    router.route('/signin')
    .post(authController.signInAction);

module.exports = router;