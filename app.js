'use strinct';

const express =require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const logger = require('morgan');

const config = require('./config/config');
const { port } = require('./config');

const { passport } = require('./service/passport');

const app = express();
const server = app.listen(port);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());

mongoose.Promise = require('bluebird');
mongoose.connect(global.gConfig.mongoDb.devDbUrl, { promiseLibrary: require('bluebird'), useFindAndModify: false })
    .then(_ => console.log('connection succesfull'))
    .catch(error => console.log('error while connect to: ', global.gConfig.mongoDb.devDbUrl, ' => ', error));

const user = require('./routes/userRoutes');
const auth = require('./routes/authRoutes');

app.use(logger('dev'));
app.use('/api/user', user);
app.use('/api/auth', auth);