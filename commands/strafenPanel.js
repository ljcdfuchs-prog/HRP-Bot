const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()

        .setColor("DarkRed")

        .setTitle("⚖️ HRP Strafverwaltung")

        .setDescription(`
Über dieses Panel können neue Strafen eingetragen werden.

• 👢 Kick

• ⏳ Temporärer Bann

• 🔒 Permanenter Bann
`);

    const row = new ActionRowBuilder()

.addComponents(

    new ButtonBuilder()

        .setCustomId("punishment_create")

        .setLabel("➕ Strafe eintragen")

        .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()

        .setCustomId("case_search")

        .setLabel("🔍 Fälle suchen")

        .setStyle(ButtonStyle.Primary)

);

    await message.channel.send({

        embeds: [embed],

        components: [row]

    });

};