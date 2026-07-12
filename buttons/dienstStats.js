const Duty = require("../models/Duty");
const { EmbedBuilder } = require("discord.js");

module.exports = async (interaction) => {

    const duties = await Duty.find({
        userId: interaction.user.id
    });

    if (!duties.length) {
        return interaction.reply({
            content: "❌ Du hast bisher keine Dienstzeiten.",
            ephemeral: true
        });
    }

    let total = 0;

    for (const duty of duties) {
        total += duty.totalTime || 0;

        if (duty.active && !duty.paused && duty.startTime) {
    total += Date.now() - duty.startTime.getTime();
}
    }

    const hours = Math.floor(total / 3600000);
    const minutes = Math.floor((total % 3600000) / 60000);

    const active = duties.some(d => d.active);

    const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("📊 Deine Dienststatistik")
        .addFields(
            {
                name: "📌 Status",
                value: active ? "🟢 Im Dienst" : "🔴 Nicht im Dienst",
                inline: true
            },
            {
                name: "⏱️ Gesamtzeit",
                value: `${hours} Stunden ${minutes} Minuten`,
                inline: true
            },
            {
                name: "📁 Schichten",
                value: `${duties.length}`,
                inline: true
            }
        )
        .setTimestamp();

    return interaction.reply({
        embeds: [embed],
        ephemeral: true
    });

};