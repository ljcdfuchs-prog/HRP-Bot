const Duty = require("../models/Duty");
const config = require("../config");

module.exports = async (interaction) => {

    const member = await interaction.guild.members.fetch(interaction.user.id);

console.log("User Voice:", member.voice.channel?.id);
console.log("Config Voice:", config.dutyVoiceChannelId);

    // Prüfen ob User im Voice ist
    if (!member.voice.channel) {
        return interaction.reply({
            content: "❌ Du musst im Admin-Talk sein, um deinen Dienst zu starten.",
            ephemeral: true
        });
    }

    // Richtiger Talk?
    if (member.voice.channel.id !== config.dutyVoiceChannelId) {
        return interaction.reply({
            content: "❌ Du musst im vorgesehenen Admin-Talk sein.",
            ephemeral: true
        });
    }

    // Läuft bereits ein Dienst?
    const activeDuty = await Duty.findOne({
        userId: interaction.user.id,
        active: true
    });

    if (activeDuty) {
        return interaction.reply({
            content: "❌ Du bist bereits im Dienst.",
            ephemeral: true
        });
    }

    // Bestehenden Eintrag suchen
let duty = await Duty.findOne({
    userId: interaction.user.id
});

if (!duty) {

    duty = new Duty({
        userId: interaction.user.id,
        username: interaction.user.username,
        totalTime: 0,
        shifts: 0
    });

}

// Dienst starten
duty.username = interaction.user.username;
duty.active = true;
duty.paused = false;
duty.startTime = new Date();

await duty.save();

await member.roles.add(config.dutyRoleId);

    return interaction.reply({
        content: "🟢 Dein Dienst wurde erfolgreich gestartet.",
        ephemeral: true
    });

};