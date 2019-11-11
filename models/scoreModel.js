'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const scoreSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    event: { type: ObjectId, ref: 'Event', required: true },
    trial: { type: ObjectId, ref: 'Trial' },
    points: { type: Number, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
})

scoreSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Score', scoreSchema);