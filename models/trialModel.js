'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const trialSchema = new Schema({
    name: { type: String, required: true },
    maxPoint: { type: Number, default: 0 },
    timeTrialMinute: { type: Number, default: -1 },
    StartDate: { type: Date, required: true },
    location: { type: String, default: null },
    trialAdmin: [{ 
        user: { type: ObjectId, ref: 'User', required: true },
        beacon: { type: Number, default: -1 }
    }],
    quiz: {
        type: {
            questions: [{ type: ObjectId, ref: 'Question', required: true }]
        },
        default: null
    },
    orientation: {
        type: {
            mapPath: { type: String, default: null },
            length: { type: Number, default: -1 },
            beacon: [{
                num: { type: Number, required: true },
                name: { type: String },
                location: { type: String },
                removedPoints: { type: Number, default: 0 },
                questions: { type: ObjectId, ref: 'Question', default: null }
            }]
        },
        default: null
    },
    achievement: [{
        user: { type: ObjectId, ref: 'User', required: true },
        success: { type: Boolean, required: true },
        question: { type: ObjectId, ref: 'Question', default: null },
        beaconNum: { type: Number, default: -1 }
    }]
}, {
    timestamps: true
});

trialSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Trial', trialSchema);