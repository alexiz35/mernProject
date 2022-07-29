const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    device: {type: String, required: true},
    claim: {type: String, required: true},
    service: {type: String, required: true},
    cost: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'},
    status: {type: String}
})

module.exports = model('Service', schema)