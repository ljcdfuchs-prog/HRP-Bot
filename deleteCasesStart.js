const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()

        .setCustomId("delete_cases_modal")

        .setTitle("🔐 Sicherheitscode");

    modal.addComponents(

        new ActionRowBuilder().addComponents(

            new TextInputBuilder()

                .setCustomId("code")

                .setLabel("Code aus deiner DM")

                .setStyle(TextInputStyle.Short)

                .setRequired(true)

        )

    );

    return interaction.showModal(modal);

};