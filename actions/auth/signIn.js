'use strict';

const PassportService = require('../../service/passport');
const UserDataService = require('../../service/userDataService');

module.exports = async (email, password, res) => {
    console.log('>>>>>>>>>>>>sign in>>>>>>>>>>>>>>>');
    try {
        email = email.toLowerCase();
        var user = await UserDataService.signIn(email, password);
        res.status(200).send(PassportService.generateUserToken(user));
    } catch (error) {
        if (error === 'Email or Password doesn\'t match.')
            res.status(401).send(error);
        else
            res.status(500).send(error);
    }
}