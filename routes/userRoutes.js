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
 * @requires controllers/userController
 */
const router = express.Router();
const userController = require('../controllers/userController');