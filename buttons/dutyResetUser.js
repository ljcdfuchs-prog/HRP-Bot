const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = async (interaction) => {

    const modal = new ModalBuilder()

        .setCustomId("duty_reset_user_modal")

        .setTitle("👤 Benutzer zurücksetzen");

    modal.addComponents(

        new ActionRowBuilder().addComponents(

            new TextInputBuilder()

                .setCustomId("userid")

                .setLabel("Discord ID des Benutzers")

                .setStyle(TextInputStyle.Short)

                .setPlaceholder("123456789012345678")

                .setRequired(true)

        )

    );

    return interaction.showModal(modal);

};