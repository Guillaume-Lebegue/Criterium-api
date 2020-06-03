'use strict'

const UserDataService = require('../../service/userDataService');

module.exports = async (userEmail, all, res) => {
    try {
        console.log('>>>>>>Get user by email>>>>>>>');
        const user = await UserDataService.getUsersByEmail(userEmail, all);
        if (!user)
            res.status(404).send('not found');
        else
            res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}