const mongoose = require("mongoose");

const punishmentSchema = new mongoose.Schema({

    robloxName: String,

    type: String,

    reason: String,

    days: Number,

    moderatorId: String,

robloxId: Number,

displayName: String,

avatar: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

    expiresAt: Date

});

module.exports = mongoose.model("Punishment", punishmentSchema);