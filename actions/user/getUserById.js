'use strict'

const userDataService = require('../../service/userDataService');

module.exports = async (userId, all, res) => {
    try {
        console.log('>>>>>>>Get user by id>>>>>>>');
        const user = await userDataService.getUserById(userId, all);
        if (!user)
            res.status(404).send('not found');
        else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}