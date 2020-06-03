'use strict';

const User = require('../models/userModel');

class userDataService {

    // Get User(s)
    getUserById(userId, all = false) {
        const query = User.findById(userId);

        return (!all ? User.publicOnly(query) : query).exec();
    };

    getUserByLicence(licence, all = false) {
        const query = User.findOne({ licence });

        return (!all ? User.publicOnly(query) : query).exec();
    }

    getUsersByEmail(email, all = false) {
        const query = User.findOne({ email });

        return (!all ? User.publicOnly(query) : query).exec();
    };

    getUsersByFirstName(firstName) {
        const query = User.find({ firstName });

        return User.publicOnly(query).exec();
    }

    getUsersByLastName(lastName) {
        const query = User.find({ lastName });

        return User.publicOnly(query).exec();
    }

    getAllUsersPaginate(query, limit, offset, sort = null) {
        return new Promise((resolve, reject) => {
            const select = User.getPublicFields();
            const opts = { offset, limit, sort, select };

            User.paginate( query , opts)
                .then(result => resolve(result))
                .catch(error => reject(error));
        })
    }

    // Create User / licenced
    createLicenced(licence, firstName, lastName, gender, birthDate) {
        return new Promise((resolve, reject) => {
            const newUser = new User();
            newUser.licence = licence;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.gender = gender;
            newUser.birthDate = birthDate;
            newUser.save((error, doc) => {
                if (error) reject(error)
                else resolve(doc)
            })
        })
    }

    createUser(licence, firstName, lastName, gender, birthDate, email, password) {
        return new Promise((resolve, reject) => {
            const newUser = new User();
            newUser.licence = licence;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.gender = gender;
            newUser.birthDate = birthDate;
            newUser.email = email;
            newUser.password = password;
            newUser.save((error, doc) => {
                if (error) reject(error)
                else resolve(doc)
            })
        })
    }

    upgradeLicencedToUser(userId, email, password) {
        return new Promise((resolve, reject) => {
            User.findById(userId, (error, user) => {
                if (error || !user) {
                    reject(error || 'not found')
                    return;
                }
                user.email = email;
                user.password = password;
                user.save((error, doc) => {
                    if (error) reject(error)
                    else resolve(doc);
                })
            })
        })
    }

    signIn(userEmail, userPassword) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: userEmail }, (error, user) => {
                if (error)
                    reject(error);
                if (!user)
                    reject('Email or Password doesn\'t match.');
                else {
                    user.comparePassword(userPassword, async (err, isMatch) => {
                        if (err)
                            reject(err);
                        else if (isMatch)
                            resolve(user);
                        else
                            reject('Email or Password doesn\'t match.');
                    })
                }
            })
        })
    }

}

module.exports = new userDataService();