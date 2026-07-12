const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()
    .setColor("#2B2D31")
    .setTitle("👮 HRP Dienstsystem")
    .setDescription("Nutze die Buttons unten, um deinen Dienst zu verwalten.")
    .setTimestamp();

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("duty_start")

                .setLabel("🟢 Dienst starten")

                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()

                .setCustomId("duty_stop")

                .setLabel("🔴 Dienst beenden")

                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()

                .setCustomId("duty_stats")

                .setLabel("📊 Meine Statistik")

                .setStyle(ButtonStyle.Primary)

        );

    await message.channel.send({

        embeds: [embed],

        components: [row]

    });

};