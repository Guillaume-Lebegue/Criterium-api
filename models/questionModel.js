'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    statement: { type: String, required: true },
    removedPoints: { type: Number, default: 0 },
    choice: [{
        num: { type: Number, default: getNextChoiceNum },
        answer: { type: String, required: true}
    }],
    goodChoice: { type: Number, required: true }
}, {
    timestamps: true
});

function getNextChoiceNum() {
    const question = this;
    return question.choice.length + 1;
}

questionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Question', questionSchema);