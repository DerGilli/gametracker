const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Game', gameSchema);