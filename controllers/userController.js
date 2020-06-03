'use strict'

const Passport = require('../service/passport');

const { isUser, isEmailOwner, isLicenceOwner } = Passport.guards;

const getUserById = require('../actions/user/getUserById');
const getUserByEmail = require('../actions/user/getUserByEmail');
const getUserByLicence = require('../actions/user/getUserByLicence');

exports.getUserByIdAction = (req, res) => {
    const { userId } = req.params;
    getUserById(userId, isUser(req, userId), res);
}

exports.getUserByEmailAction = (req, res) => {
    const { userEmail } = req.params;
    getUserByEmail(userEmail, isEmailOwner(req, userEmail), res);
}

exports.getUserByLicenceAction = (req, res) => {
    const { userLicence } = req.params;
    getUserByLicence(userLicence, isLicenceOwner(req, userLicence), res);
}