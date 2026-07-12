const Duty = require("../models/Duty");
const config = require("../config");

module.exports = async (interaction) => {

    const member = interaction.member;

    const duty = await Duty.findOne({
        userId: interaction.user.id,
        active: true
    });

    if (!duty) {
        return interaction.reply({
            content: "❌ Du bist aktuell nicht im Dienst.",
            ephemeral: true
        });
    }

    if (duty.startTime) {
    const timeWorked = Date.now() - duty.startTime.getTime();
    duty.totalTime += timeWorked;
}

duty.shifts += 1;

duty.lastDuty = new Date();

duty.active = false;
duty.paused = false;

duty.startTime = null;
duty.pauseStart = null;

await duty.save();

    // Dienstrolle entfernen
    await member.roles.remove(config.dutyRoleId);

    return interaction.reply({
        content: `🔴 Dein Dienst wurde beendet.\n\n⏱️ Arbeitszeit: **${Math.floor(duty.totalTime / 60000)} Minuten**`,
        ephemeral: true
    });

};