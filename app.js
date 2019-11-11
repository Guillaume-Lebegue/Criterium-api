'use strinct';

const config = require('./config/config');
const { port } = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(global.gConfig.mongoDb.devDbUrl, { promiseLibrary: require('bluebird'), useFindAndModify: false })
    .then(_ => console.log('connection succesfull'))
    .catch(error => console.log('error while connect to: ', global.gConfig.mongoDb.devDbUrl, ' => ', error));

const clubDataService = require('./service/clubDataService');

clubDataService.updateClubDirector('5dc9982fd0f2552030583e40', '5dc896824cc01d18d4181b73')
    .then(res => console.log('res: ', res))
    .catch(error => console.log('error: ', error))