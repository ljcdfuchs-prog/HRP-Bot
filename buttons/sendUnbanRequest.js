const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");
const UnbanRequest = require("../models/UnbanRequest");
const Punishment = require("../models/Punishment");

module.exports = async (interaction, robloxUser, punishment, reason) => {

    const already = await UnbanRequest.findOne({
        robloxId: robloxUser.robloxId,
        status: "open"
    });

    if (already) {
        return interaction.reply({
            content: "❌ Du hast bereits einen offenen Entbannungsantrag.",
            ephemeral: true
        });
    }

    const history = await Punishment.countDocuments({
        robloxId: robloxUser.robloxId
    });

    const request = await UnbanRequest.create({

        discordId: interaction.user.id,

        robloxId: robloxUser.robloxId,

        robloxName: robloxUser.robloxName,

        displayName: robloxUser.displayName,

        avatar: robloxUser.avatar,

        punishmentId: punishment._id,

        reason,

        status: "open"

    });

    const channel = interaction.client.channels.cache.get(
        config.unbanChannelId
    );

    if (!channel) {
        return interaction.reply({
            content: "❌ Entbannungs-Kanal wurde nicht gefunden.",
            ephemeral: true
        });
    }

    const buttons = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId(`unban_accept_${request._id}`)
            .setLabel("✅ Annehmen")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId(`unban_deny_${request._id}`)
            .setLabel("❌ Ablehnen")
            .setStyle(ButtonStyle.Danger)

    );

    const embed = new EmbedBuilder()

        .setColor("Blue")

        .setTitle("🔓 Neuer Entbannungsantrag")

        .setThumbnail(robloxUser.avatar)

        .addFields(

            {
                name: "👤 Roblox",
                value: robloxUser.robloxName,
                inline: true
            },

            {
                name: "🆔 Roblox ID",
                value: String(robloxUser.robloxId),
                inline: true
            },

            {
                name: "📊 Vorstrafen",
                value: String(history),
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
                    ? `<t:${Math.floor(new Date(punishment.createdAt).getTime() / 1000)}:F>`
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
                inline: false
            },

            {
                name: "📝 Bann Grund",
                value: punishment.reason,
                inline: false
            },

            {
                name: "💬 Entbannungsgrund",
                value: reason,
                inline: false
            },

            {
                name: "🔗 Roblox Profil",
                value: `[Profil öffnen](https://www.roblox.com/users/${robloxUser.robloxId}/profile)`,
                inline: false
            }

        )

        .setTimestamp();

    await channel.send({

        embeds: [embed],

        components: [buttons]

    });

    return interaction.reply({

        content: "✅ Dein Entbannungsantrag wurde erfolgreich abgeschickt.",

        ephemeral: true

    });

};