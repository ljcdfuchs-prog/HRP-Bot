const {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()
        .setCustomId("unban_name_modal")
        .setTitle("🔓 Entbannungsantrag");

    const username = new TextInputBuilder()
        .setCustomId("roblox")
        .setLabel("Roblox Benutzername")
        .setPlaceholder("z.B. Builderman")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder().addComponents(username)
    );

    await interaction.showModal(modal);

};