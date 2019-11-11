'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
    name: { type: String, required: true },
    restrict: {
        ageMin: { type: Number, default: null },
        ageMax: { type: Number, default: null },
        genre: { type: String,  enum: ['F', 'M', 'Nan'], default: 'Nan' }
    },
    startingPoints: { type: Number, default: 0 },
    trial: [{ type: ObjectId, ref: 'Trial', required: true }]
}, {
    timestamps: true
})

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', categorySchema);