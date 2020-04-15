'use strict';

const PassportService = require('../../service/passport');
const UserDataService = require('../../service/userDataService');

module.exports = async (licence, firstName, lastName, gender, birthdate, email, password, res) => {
    console.log('>>>>>>>>>>>>Sign up>>>>>>>>>>');
    if (email) {
        email = email.toLowerCase();
        var user = await UserDataService.getUsersByEmail(email);
        if (user) {
            res.status(409).send('Email already used.');
            return;
        }
        user = await UserDataService.getUserByLicence(licence);
        if (user) {
            res.status(409).send('Licence already used.');
            return;
        }
        try {
            var newUser = await UserDataService.createUser(licence, firstName, lastName, gender, birthdate, email, password);
            res.status(200).send(PassportService.generateUserToken(newUser));
        } catch (error) {
            res.status(500).send(error);
        }
    }
}