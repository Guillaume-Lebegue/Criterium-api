'use strict';

const signIn = require('../actions/auth/signIn');
const signUp = require('../actions/auth/signUp');

exports.signUpAction = (req, res) => {
    const { licence, firstName, lastName, gender, birthdate, email, password } = req.body;
    signUp(licence, firstName, lastName, gender, birthdate, email, password, res);
}

exports.signInAction = (req, res) => {
    const { email, password } = req.body;
    signIn(email, password, res);
}
