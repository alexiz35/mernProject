const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, default: 'FirstName', required: true},
    lastName: {type: String, default: 'LastName', required: true},
    phone: {type: String, default: 'Phone', required: true},
    services: [{type: Types.ObjectId, ref: 'Service'}]
})

module.exports = model('User', schema)