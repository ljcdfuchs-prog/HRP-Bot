const mongoose = require("mongoose");

const dutySchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    totalTime: {
        type: Number,
        default: 0
    },

    shifts: {
        type: Number,
        default: 0
    },

    active: {
        type: Boolean,
        default: false
    },

    paused: {
        type: Boolean,
        default: false
    },

    startTime: {
        type: Date,
        default: null
    },

    pauseStart: {
        type: Date,
        default: null
    },

    lastDuty: {
        type: Date,
        default: null
    }

});

module.exports = mongoose.model("Duty", dutySchema);