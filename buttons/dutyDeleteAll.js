const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (interaction) => {

    const row = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId("duty_delete_all_confirm")
            .setLabel("✅ Ja, löschen")
            .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
            .setCustomId("duty_delete_all_cancel")
            .setLabel("❌ Abbrechen")
            .setStyle(ButtonStyle.Secondary)

    );

    return interaction.reply({

        content:
"⚠️ **Möchtest du wirklich ALLE Dienststatistiken löschen?**\n\nDiese Aktion kann **nicht rückgängig** gemacht werden.",

        components: [row],

        ephemeral: true

    });

};