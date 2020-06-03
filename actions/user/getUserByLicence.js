'use strict'

const UserDataService = require('../../service/userDataService');

module.exports = async (userLicence, all, res) => {
    try {
        console.log('>>>>>>Get user by licence>>>>>>');
        const user = await UserDataService.getUserByLicence(userLicence, all);
        if (!user)
            res.status(404).send('not found');
        else
            res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}