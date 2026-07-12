const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()
        .setCustomId("unban_reason_modal")
        .setTitle("📝 Entbannungsantrag");

    const reason = new TextInputBuilder()
        .setCustomId("reason")
        .setLabel("Warum möchtest du entbannt werden?")
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(1000)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder().addComponents(reason)
    );

    await interaction.showModal(modal);

};