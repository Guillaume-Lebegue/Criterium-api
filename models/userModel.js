'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    licence: { type: Number, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['F', 'M', 'Nan'], required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, unique: true, required: false, validate: [testEmail, 'Email invalid'], default: null},
    emailCheck: { type: Boolean, default: false},
    password: { type: String, default: null },
    phone: { type: String, required: false, validate: [testPhone, 'Phone invalid'], default: null},
    phoneChecked: { type: Boolean, default: false },
    profileImage: { type: String, default: null },
    address: { type: String },
    canCreate: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    lastDate: { type: Date, default: Date.now() }
}, {
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
})

// Virtual fields
userSchema.virtual('age')
    .get(function() {
        const user = this
        return new Date().getFullYear() - new Date(user.birthDate).getFullYear();
    })

// custom validator
function testEmail(email) {
    if (!email) return true;
    else return validator.isEmail(email);
}

function testPhone(phone) {
    if (!phone) return true;
    else return validator.isMobilePhone(phone);
}

// Password handling
userSchema.pre('save', function(next) {
    const user = this;

    if (!user.password || !user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        else {
            user.password = hash;
            next();
        }
    })
})

userSchema.methods.comparePassword = function(plainTextPassword, cb) {
    bcrypt.compare(plainTextPassword, this.password, (err, isMatch) => {
        if (err) cb(err, null);
        else cb(null, isMatch)
    })
}

// Public / Private fields
const nPublicFields = ['-email', '-password', '-phone', 'address'];

userSchema.statics.getPublicFields = function() {
    return nPublicFields;
}

userSchema.statics.publicOnly = function(queryObject) {return queryObject.select(nPublicFields); }


userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);