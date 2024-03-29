
const mongose = require('mongoose')

const UsersSchema = mongose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    register: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongose.model('User', UsersSchema)

