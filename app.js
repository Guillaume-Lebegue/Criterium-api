'use strinct';

const config = require('./config/config');
const { port } = require('./config');

const UserService = require('./service/userService');

UserService.getAllConfidentialUsers(0, 10, [], true, "nom")
    .then(console.log)
    .catch(console.log);

