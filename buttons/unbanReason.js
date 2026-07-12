const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()

        .setCustomId(`unban_reason_modal_${interaction.customId.split("_")[2]}`)

        .setTitle("🔓 Entbannungsantrag");

    const input = new TextInputBuilder()

        .setCustomId("reason")

        .setLabel("Warum möchtest du entbannt werden?")

        .setPlaceholder("Bitte begründe deinen Antrag möglichst ausführlich.")

        .setStyle(TextInputStyle.Paragraph)

        .setMinLength(20)

        .setMaxLength(1000)

        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder().addComponents(input)
    );

    return interaction.showModal(modal);

};