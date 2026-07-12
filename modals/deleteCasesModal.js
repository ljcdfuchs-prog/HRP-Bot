const {
    EmbedBuilder
} = require("discord.js");

const Punishment = require("../models/Punishment");
const codes = require("../utils/deleteCaseCodes");
const config = require("../config");

module.exports = async (interaction) => {

    const input =
        interaction.fields.getTextInputValue("code").trim().toUpperCase();

    const code = codes.get(interaction.user.id);

    if (!code) {

        return interaction.reply({

            content: "❌ Der Code ist abgelaufen.",

            ephemeral: true

        });

    }

    if (input !== code) {

        return interaction.reply({

            content: "❌ Falscher Sicherheitscode.",

            ephemeral: true

        });

    }

    codes.delete(interaction.user.id);

    await Punishment.deleteMany({});

    const channel =
        interaction.client.channels.cache.get(
            config.leitungChannelId
        );

    if (channel) {

        const embed = new EmbedBuilder()

            .setColor("Red")

            .setTitle("🗑️ Strafdatenbank geleert")

            .setDescription(
                "Alle Strafeinträge wurden gelöscht."
            )

            .addFields(

                {
                    name: "👮 Ausgeführt von",
                    value: `${interaction.user}`,
                    inline: true
                },

                {
                    name: "🕒 Zeitpunkt",
                    value: `<t:${Math.floor(Date.now()/1000)}:F>`,
                    inline: false
                }

            )

            .setTimestamp();

        await channel.send({

            embeds: [embed]

        });

    }

    return interaction.reply({

        content:
"✅ Alle Strafeinträge wurden erfolgreich gelöscht.",

        ephemeral: true

    });

};