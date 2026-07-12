const lookup = require("../utils/unbanLookup");
const showPunishment = require("./showPunishment");

module.exports = async (interaction) => {

    const username =
        interaction.fields.getTextInputValue("roblox");

    const data = await lookup(username);

    if (!data) {

        return interaction.reply({

            content:
                "❌ Roblox-Benutzer wurde nicht gefunden.",

            ephemeral: true

        });

    }

    if (!data.punishment) {

        return interaction.reply({

            content:
                "❌ Für diesen Roblox-Account wurde kein aktiver Bann gefunden.",

            ephemeral: true

        });

    }

    return showPunishment(interaction, data);

};