'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const validator = require('validator');

const clubSchema = new Schema({
    name: { type: String, required: true },
    director: { type: ObjectId, ref: 'User' },
    address: {
        country: { type: String, required: true },
        town: { type: String, required: true },
        postalCode: { type: String, validate: [testPostalCode, 'postalCode invalid'] }
    },
    licenced: {
        registration: [{ type: ObjectId, ref: 'User' }],
        invited: [{
            user: { type: ObjectId, ref: 'User', required: true },
            email: { type: String, required: true, validate: [validator.isEmail, 'Email invalid'] },
            autoLogin: { type: String, required: true }
        }],
        isLicenced: [{
            user :{ type: ObjectId, ref: 'User' },
            isAdmin: { type: Boolean, default: false}
        }]
    }
}, {
    timestamps: true
})

// Custom validator
function testPostalCode(postalCode) {
    return validator.isPostalCode(postalCode, 'FR');
}

clubSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Club', clubSchema);