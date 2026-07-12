const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (interaction, data) => {

    const punishment = data.punishment;

    const embed = new EmbedBuilder()

        .setColor("Orange")

        .setTitle("📄 Gefundener Bann")

        .setThumbnail(data.avatar)

        .setDescription(
`Für deinen Roblox-Account wurde ein Bann gefunden.

Bitte überprüfe die Daten.

Wenn alles stimmt, kannst du unten einen Entbannungsantrag schreiben.`
        )

        .addFields(

            {
                name: "👤 Roblox",
                value: data.robloxName,
                inline: true
            },

            {
                name: "🆔 Roblox ID",
                value: String(data.robloxId),
                inline: true
            },

            {
                name: "🔨 Bannart",
                value: punishment.type,
                inline: true
            },

            {
                name: "📅 Gebannt seit",
                value: punishment.createdAt
                    ? `<t:${Math.floor(new Date(punishment.createdAt).getTime()/1000)}:F>`
                    : "Unbekannt",
                inline: true
            },

            {
                name: "⏳ Dauer",
                value:
                    punishment.type === "permban"
                        ? "🔒 Permanent"
                        : `${punishment.days} Tage`,
                inline: true
            },

            {
                name: "👮 Moderator",
                value: `<@${punishment.moderatorId}>`,
                inline: true
            },

            {
                name: "📝 Bann Grund",
                value: punishment.reason
            },

            {
                name: "🔗 Roblox Profil",
                value: `[Profil öffnen](https://www.roblox.com/users/${data.robloxId}/profile)`
            }

        )

        .setTimestamp();

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId(`unban_reason_${data.robloxId}`)

                .setLabel("📝 Entbannungsantrag schreiben")

                .setEmoji("📝")

                .setStyle(ButtonStyle.Success)

        );

    return interaction.reply({

        embeds: [embed],

        components: [row],

        ephemeral: true

    });

};