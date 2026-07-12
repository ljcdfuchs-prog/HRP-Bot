const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const codes = require("../utils/deleteCaseCodes");

module.exports = async (message) => {

    if (!message.member.roles.cache.has(process.env.DELETE_CASES_ROLE)) {

        return message.reply("❌ Keine Berechtigung.");

    }

    const code = Math.random().toString(36).substring(2,8).toUpperCase();

    codes.set(message.author.id, code);

    try {

        await message.author.send(
`🔐 Sicherheitscode

Dein Bestätigungscode lautet:

**${code}**

Dieser Code ist 5 Minuten gültig.`
        );

    } catch {

        return message.reply("❌ Ich kann dir keine DM senden.");

    }

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("delete_cases_start")

                .setLabel("🔑 Code eingeben")

                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()

                .setCustomId("delete_cases_cancel")

                .setLabel("❌ Abbrechen")

                .setStyle(ButtonStyle.Secondary)

        );

    await message.reply({

        content:
"⚠️ Der Sicherheitscode wurde dir per DM geschickt.",

        components:[row]

    });

};