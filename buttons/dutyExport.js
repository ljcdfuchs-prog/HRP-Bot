const Duty = require("../models/Duty");

console.log("Duty:", Duty);

const { AttachmentBuilder } = require("discord.js");
const fs = require("fs");

module.exports = async (interaction) => {

    const duties = await Duty.find();

    if (!duties.length) {
        return interaction.reply({
            content: "❌ Es sind keine Dienststatistiken vorhanden.",
            ephemeral: true
        });
    }

    let text = "";
text += "==========================================\n";
text += "      HRP - DIENSTSTATISTIK\n";
text += "==========================================\n\n";

    const users = {};

    for (const duty of duties) {

        if (!users[duty.userId]) {
            users[duty.userId] = {
                username: duty.username,
                totalTime: 0,
                shifts: 0
            };
        }

        users[duty.userId].totalTime += duty.totalTime || 0;
        users[duty.userId].shifts++;

    }

    for (const userId in users) {

        const user = users[userId];

        const hours = (user.totalTime / 3600000).toFixed(2);

        text += `👤 Benutzer: ${user.username}\n`;
text += `🆔 Discord-ID: ${userId}\n`;
text += `⏱️ Gesamtstunden: ${hours}h\n`;
text += `📅 Schichten: ${user.shifts}\n`;
text += "------------------------------------------\n\n";

    }

    text += `Exportiert am: ${new Date().toLocaleString("de-DE")}`;

fs.writeFileSync("dienststatistik.txt", text);

const file = new AttachmentBuilder("dienststatistik.txt");

    return interaction.reply({

        content: "📄 Dienststatistik erfolgreich exportiert.",

        files: [file],

        ephemeral: true

    });

};