'use strinct';

const config = require('./config/config');
const { port } = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(global.gConfig.mongoDb.devDbUrl, { promiseLibrary: require('bluebird') })
    .then(_ => console.log('connection succesfull'))
    .catch(error => console.log('error while connect to: ', global.gConfig.mongoDb.devDbUrl, ' => ', error));

const userDataService = require('./service/userDataService');

userDataService.getAllUsersPaginate(null, 5, 0)
    .then(result => console.log('result: ', result))
    .catch(error => console.log('error: ', error));