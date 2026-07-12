const {
    EmbedBuilder
} = require("discord.js");

const UnbanRequest = require("../models/UnbanRequest");

module.exports = async (interaction) => {

    const id = interaction.customId.split("_")[2];

    const request = await UnbanRequest.findById(id);

    if (!request) {

        return interaction.reply({

            content: "❌ Antrag nicht gefunden.",

            ephemeral: true

        });

    }

    request.status = "denied";

    await request.save();

    try {

        const user = await interaction.client.users.fetch(
            request.discordId
        );

        await user.send({

            embeds: [

                new EmbedBuilder()

                    .setColor("Red")

                    .setTitle("❌ Entbannungsantrag abgelehnt")

                    .setDescription(

`Dein Entbannungsantrag wurde leider abgelehnt.

Du kannst später erneut einen Antrag stellen.`

                    )

                    .setTimestamp()

            ]

        });

    } catch {}

    const embed = EmbedBuilder.from(
        interaction.message.embeds[0]
    )

        .setColor("Red")

        .setFooter({

            text: `Abgelehnt von ${interaction.user.tag}`

        });

    await interaction.update({

        embeds: [embed],

        components: []

    });

};