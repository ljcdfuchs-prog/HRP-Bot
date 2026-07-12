const {
    EmbedBuilder
} = require("discord.js");

const UnbanRequest = require("../models/UnbanRequest");
const Punishment = require("../models/Punishment");

module.exports = async (interaction) => {

    const id = interaction.customId.split("_")[2];

    const request = await UnbanRequest.findById(id);

    if (!request) {

        return interaction.reply({

            content: "❌ Antrag nicht gefunden.",

            ephemeral: true

        });

    }

    await Punishment.findByIdAndDelete(
        request.punishmentId
    );

    request.status = "accepted";

    await request.save();

    try {

        const user = await interaction.client.users.fetch(
            request.discordId
        );

        await user.send({

            embeds: [

                new EmbedBuilder()

                    .setColor("Green")

                    .setTitle("✅ Entbannungsantrag angenommen")

                    .setDescription(

`Hallo!

Dein Entbannungsantrag wurde angenommen.

Du kannst nun wieder einen Entbannungsprozess im Spiel durchführen.

Viel Spaß auf HRP!`

                    )

                    .setTimestamp()

            ]

        });

    } catch {}

    const embed = EmbedBuilder.from(
        interaction.message.embeds[0]
    )

        .setColor("Green")

        .setFooter({

            text: `Angenommen von ${interaction.user.tag}`

        });

    await interaction.update({

        embeds: [embed],

        components: []

    });

};