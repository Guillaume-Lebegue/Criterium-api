'use strict';
/** Express router providing user related routes
 * @module routes/userRoutes
 * @requires express
 */

/**
 * express Module
 * @const
*/
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRouter
 * @requires service/passport
 * @requires controllers/userController
 */
const router = express.Router();
const userController = require('../controllers/userController');
const Passport = require('../service/passport');

/**
 * Route getting a user by user_id
 * @name 00-/:userId
 * @route {GET} /:userId
 * @memberof module:routes/userRoutes~userRouter
 * @routeparam {String} :userId is the id of the user
 */
router.route('/:userId')
    .all(Passport.middlewares.optionalTokenAuth)
    .get(userController.getUserByIdAction)

/**
 * Route getting a user by email
 * @name 01-/mail/:userEmail
 * @route {GET} /mail/:userEmail
 * @memberof module:routes/userRoutes~userRouter
 * @routeparam {String} :userEmail is the email of the user
 */
router.route('/mail/:userEmail')
    .all(Passport.middlewares.optionalTokenAuth)
    .get(userController.getUserByEmailAction)

/**
 * Route getting a user by licence
 * @name 02-/licence/:userLicence
 * @route {GET} /licence/:userLicence
 * @memberof module:routes/userRoutes~userRouter
 * @routeparam {String} :userLicence is the licence of the user
 */
router.route('/licence/:userLicence')
    .all(Passport.middlewares.optionalTokenAuth)
    .get(userController.getUserByEmailAction)

module.exports = router;