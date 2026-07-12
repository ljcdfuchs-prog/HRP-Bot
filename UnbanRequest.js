const mongoose = require("mongoose");

module.exports = mongoose.model(
    "UnbanRequest",
    new mongoose.Schema({

        discordId: String,

        robloxId: Number,

        robloxName: String,

        displayName: String,

        avatar: String,

        punishmentId: String,

        reason: String,

        status: {
            type: String,
            default: "open"
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    })
);