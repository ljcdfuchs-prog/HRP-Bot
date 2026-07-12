const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (interaction) => {

    try {

        const dm = await interaction.user.createDM();

        const embed = new EmbedBuilder()

            .setColor("Blue")

            .setTitle("🔓 HRP Entbannungssystem")

            .setThumbnail(interaction.client.user.displayAvatarURL())

            .setDescription(
`Willkommen beim HRP Entbannungssystem.

Über dieses System kannst du einen Entbannungsantrag stellen.

Der Bot sucht deinen Bann automatisch heraus und sendet deinen Antrag anschließend an das HRP-Team.

Bitte klicke unten auf **Antrag starten**.`
            )

            .setFooter({
                text: "HRP Hamburg RP"
            })

            .setTimestamp();

        const row = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()

                    .setCustomId("unban_begin")

                    .setLabel("📝 Antrag starten")

                    .setEmoji("📝")

                    .setStyle(ButtonStyle.Success)

            );

        await dm.send({

            embeds: [embed],

            components: [row]

        });

        return interaction.reply({

            content:
                "📩 Ich habe dir eine private Nachricht geschickt.",

            ephemeral: true

        });

    } catch {

        return interaction.reply({

            content:
                "❌ Ich konnte dir keine DM schicken. Bitte aktiviere deine privaten Nachrichten.",

            ephemeral: true

        });

    }

};