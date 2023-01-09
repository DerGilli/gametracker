const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Game', gameSchema);