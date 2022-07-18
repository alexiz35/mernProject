const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    device: {type: String, required: true},
    claim: {type: String, required: true},
    service: {type: String, required: true},
    cost: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Service', schema)