const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");

module.exports = async (message) => {

    if (!message.member.roles.cache.has(config.dutyManagerRoleId)) {
        return message.reply("❌ Du hast keine Berechtigung.");
    }

    const embed = new EmbedBuilder()

        .setColor("#2B2D31")

        .setTitle("👮 Schichtverwaltung")

        .setDescription(`Verwalte hier das Dienstsystem.

**Wähle eine Aktion aus:**`)

        .setTimestamp();

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("duty_export")

                .setLabel("📄 Exportieren")

                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()

                .setCustomId("duty_reset_user")

                .setLabel("👤 Benutzer zurücksetzen")

                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()

                .setCustomId("duty_delete_all")

                .setLabel("🗑️ Alle löschen")

                .setStyle(ButtonStyle.Danger)

        );

    await message.channel.send({

        embeds: [embed],

        components: [row]

    });

};