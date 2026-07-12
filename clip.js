const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    name: "clip",
    description: "Sendet den Clip Upload Link",

    async execute(message) {

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("🎥 Clip Upload")
            .setDescription(
`Discord blockiert große Videos.

Lade deinen Clip bitte über unsere Website hoch.

Nach dem Upload gib im Ticket kurz Bescheid.`
            );

        const row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setLabel("🎥 Clip hochladen")
                .setStyle(ButtonStyle.Link)
                .setURL("https://web-hrp-production.up.railway.app/upload")

        );

        await message.reply({
            embeds: [embed],
            components: [row]
        });

    }
};