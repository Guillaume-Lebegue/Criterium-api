'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
    name: { type: String, required: true },
    dateStart: { type: Date, required: true, validate: [testStart, 'DateStart invalid'] },
    dateEnd: { type: Date, required: true, validate: [testEnd, 'DateEnd invalid'] },
    address: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    creator: { type: ObjectId, ref: 'User', required: true },
    registered: {
        invited: [{
            user: { type: ObjectId, ref: 'User', required: true },
            as: { type: String, enum: ['participant', 'admin'] },
            category: { type: String, default: null },
            level: { type: String, default: null }
        }],
        participant: [{
            user: { type: ObjectId, ref: 'User', required: true },
            category: { type: String, required: true }
        }],
        admin: [{
            user: { type: ObjectId, ref: 'User', required: true },
            level: { type: String, default: null }
        }]
    },
    category: [{ type: ObjectId, ref: 'Category', required: true }]
}, {
    timestamps: true
})

function testEnd(end) {
    const user = this;
    return !user.dateStart ? true : Date(end) > Date(user.dateStart);
}

function testStart(start) {
    const user = this;
    return !user.dateEnd ? true : Date(start) < Date(user.dateEnd);
}

eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', eventSchema);