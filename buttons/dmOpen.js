const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

    const target = interaction.customId.replace("dm_open_", "");

    const modal = new ModalBuilder()
        .setCustomId(`dm_modal_${target}`)
        .setTitle("📨 Nachricht erstellen");

    const color = new TextInputBuilder()
        .setCustomId("color")
        .setLabel("Farbe (z.B. Blau oder #5865F2)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const title = new TextInputBuilder()
        .setCustomId("title")
        .setLabel("Überschrift")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const description = new TextInputBuilder()
        .setCustomId("description")
        .setLabel("Nachricht")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const buttonText = new TextInputBuilder()
        .setCustomId("buttonText")
        .setLabel("Button Text (optional)")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const buttonLink = new TextInputBuilder()
        .setCustomId("buttonLink")
        .setLabel("Button Link (optional)")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    modal.addComponents(
        new ActionRowBuilder().addComponents(color),
        new ActionRowBuilder().addComponents(title),
        new ActionRowBuilder().addComponents(description),
        new ActionRowBuilder().addComponents(buttonText),
        new ActionRowBuilder().addComponents(buttonLink)
    );

    await interaction.showModal(modal);

};