const fs = require("fs");
const config = require("../config");

const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

const rpStart = require("../buttons/rpStart");
const rpStop = require("../buttons/rpStop");
const axios = require("axios");

const Training = require("../models/Training");

const raidSuspect = require("../buttons/raidSuspect");
const raidActive = require("../buttons/raidActive");
const raidEnd = require("../buttons/raidEnd");
const ingameHelp = require("../buttons/ingameHelp");

const teamMeeting = require("../buttons/teamMeeting");
const meetingJoin = require("../buttons/meetingJoin");
const Meeting = require("../models/Meeting");

const createTraining = require("../buttons/createTraining");
const trainingList = require("../buttons/trainingList");
const trainingJoin = require("../buttons/trainingJoin");

const Punishment = require("../models/Punishment");
const unbanStart = require("../buttons/unbanStart");
const unbanBegin = require("../buttons/unbanBegin");
const unbanSearch = require("../buttons/unbanSearch");
const unbanReason = require("../buttons/unbanReason");
const unbanAccept = require("../buttons/unbanAccept");
const unbanDecline = require("../buttons/unbanDecline");
const caseSearch = require("../buttons/caseSearch");

const dienstStart = require("../buttons/dienstStart");
const dienstStop = require("../buttons/dienstStop");
const dienstStats = require("../buttons/dienstStats");

const dutyDeleteAllConfirm = require("../buttons/dutyDeleteAllConfirm");
const dutyDeleteAllCancel = require("../buttons/dutyDeleteAllCancel");
const dutyExport = require("../buttons/dutyExport");
const dutyResetUser = require("../buttons/dutyResetUser");
const dutyDeleteAll = require("../buttons/dutyDeleteAll");
const dutyResetUserModal = require("../buttons/dutyResetUserModal");

const deleteCasesStart = require("../buttons/deleteCasesStart");
const deleteCasesCancel = require("../buttons/deleteCasesCancel");
const deleteCasesModal = require("../modals/deleteCasesModal");

const dmOpen = require("../buttons/dmOpen");
const dmModal = require("../modals/dmModal");
const dmCancel = require("../buttons/dmCancel");
const dmSend = require("../buttons/dmSend");


async function getRobloxUser(username) {


    const response = await axios.post(
        "https://users.roblox.com/v1/usernames/users",
        {
            usernames: [username],
            excludeBannedUsers: false
        }
    );

    if (!response.data.data.length)
        return null;

    const user = response.data.data[0];

    const avatar = await axios.get(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=420x420&format=Png&isCircular=false`
    );

    return {

        id: user.id,

        username: user.name,

        displayName: user.displayName,

        avatar: avatar.data.data[0].imageUrl

    };

}
module.exports = async (interaction) => {

    try {

        // MODALS
        if (interaction.isModalSubmit()) {
if (interaction.customId === "duty_reset_user_modal") {
    return dutyResetUserModal(interaction);
}
    

            // TRAINING MODAL
            if (interaction.customId === "training_modal") {

    const title =
        interaction.fields.getTextInputValue("training_title");

    const date =
        interaction.fields.getTextInputValue("training_date");
const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

if (!dateRegex.test(date)) {
    return interaction.reply({
        content: "❌ Bitte gib das Datum im Format **TT.MM.JJJJ** ein.\n\nBeispiel: 28.06.2026",
        ephemeral: true
    });
}

    const from =
        interaction.fields.getTextInputValue("training_from");

    const to =
        interaction.fields.getTextInputValue("training_to");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

if (!timeRegex.test(from)) {
    return interaction.reply({
        content: "❌ Die Startzeit muss im Format **HH:MM** sein.\n\nBeispiel: 18:00",
        ephemeral: true
    });
}

if (!timeRegex.test(to)) {
    return interaction.reply({
        content: "❌ Die Endzeit muss im Format **HH:MM** sein.\n\nBeispiel: 20:00",
        ephemeral: true
    });
}

    const max =
        interaction.fields.getTextInputValue("training_max");

    const channel =
        interaction.client.channels.cache.get(
            config.ausbildungChannelId
        );

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("training_join")
                .setLabel("✅ Anmelden")
                .setStyle(ButtonStyle.Success)
        );

    const embed = new EmbedBuilder()
        .setTitle("👨‍💼 ADMIN-AUSBILDUNG")
        .setColor("Orange")
        .setThumbnail(interaction.guild.iconURL())
        .addFields(
            {
                name: "📚 Titel",
                value: title,
                inline: false
            },
            {
                name: "📅 Datum",
                value: date,
                inline: true
            },
            {
                name: "🕒 Zeit",
                value: `${from} - ${to}`,
                inline: true
            },
            {
                name: "👤 Ausbilder",
                value: `${interaction.user}`,
                inline: false
            },
            {
                name: "👥 Plätze",
                value: `0 / ${max}`,
                inline: false
            },
            {
                name: "📋 Teilnehmer",
                value: "Keine Teilnehmer",
                inline: false
            }
        )
        .setFooter({
            text: "HRP Admin Ausbildung"
        })
        .setTimestamp();

    const msg = await channel.send({
        embeds: [embed],
        components: [row]
    });

    try {

    const training = await Training.create({
	messageChannelId: channel.id,
        messageId: msg.id,
        title,
        date,
        from,
        to,
        max: Number(max),
        creatorId: interaction.user.id,
        participants: []
    });

    console.log("GESPEICHERT:");
    console.log(training);

} catch (err) {

    console.error("MONGO FEHLER:");
    console.error(err);

}

    return interaction.reply({
        content: "✅ Ausbildung erstellt.",
        ephemeral: true
    });
}

            // TEAM MEETING MODAL
            if (interaction.customId === "team_meeting_modal") {

                const title =
                    interaction.fields.getTextInputValue("meeting_title");

                const date =
                    interaction.fields.getTextInputValue("meeting_date");
const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

if (!dateRegex.test(date)) {
    return interaction.reply({
        content: "❌ Bitte gib das Datum im Format **TT.MM.JJJJ** ein.\n\nBeispiel: 28.06.2026",
        ephemeral: true
    });
}

                const time =
                    interaction.fields.getTextInputValue("meeting_time");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

if (!timeRegex.test(time)) {
    return interaction.reply({
        content: "❌ Bitte gib die Uhrzeit im Format **HH:MM** ein.\n\nBeispiel: 19:30",
        ephemeral: true
    });
}

                const place =
                    interaction.fields.getTextInputValue("meeting_place");

                const info =
                    interaction.fields.getTextInputValue("meeting_info");

                const channel =
                    interaction.client.channels.cache.get(
                        config.leitungChannelId
                    );

                const button = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("meeting_join")
                            .setLabel("✅ Anmelden")
                            .setStyle(ButtonStyle.Success)
                    );

                const embed = new EmbedBuilder()
                    .setTitle(`📢 TEAM MEETING | ${title}`)
                    .setColor("#0099ff")
                    .setThumbnail(interaction.guild.iconURL())
                    .setAuthor({
                        name: "HRP Hamburg RP",
                        iconURL: interaction.guild.iconURL()
                    })
                    .setDescription(
`━━━━━━━━━━━━━━━━━━━━━━

📢 **Ein neues Team Meeting wurde angekündigt**

Bitte melde dich über den Button unten an.

━━━━━━━━━━━━━━━━━━━━━━`
                    )
                    .addFields(
                        {
                            name: "📅 Datum",
                            value: `>>> ${date}`,
                            inline: true
                        },
                        {
                            name: "🕒 Uhrzeit",
                            value: `>>> ${time}`,
                            inline: true
                        },
                        {
                            name: "🎤 Ort",
                            value: `>>> ${place}`,
                            inline: true
                        },
                        {
                            name: "📝 Informationen",
                            value: `>>> ${info}`,
                            inline: false
                        },
                        {
                            name: "👥 Teilnehmer (0)",
                            value: ">>> Noch keine Teilnehmer",
                            inline: false
                        }
                    )
                    .setImage(
                        "https://cdn.discordapp.com/attachments/1519042587976007751/1519049105840803908/file_00000000d784720aa41c483a0b5e5279.png"
                    )
                    .setFooter({
                        text: `HRP Leitung • ${interaction.guild.name}`
                    })
                    .setTimestamp();

                const msg = await channel.send({
                    content: `<@&${config.raidPingRoleId}>`,
                    embeds: [embed],
                    components: [button]
                });

                await Meeting.create({

    messageId: msg.id,
    messageChannelId: channel.id,

    title,
    date,
    time,
    place,
    info,

    creatorId: interaction.user.id,

    participants: [],

    status: "open"

});

                return interaction.reply({
                    content: "✅ Meeting erstellt.",
                    ephemeral: true
                });
            }
        }


// ======================================
// KICK
// ======================================

if (interaction.customId === "kick_modal") {

    const roblox = interaction.fields.getTextInputValue("roblox");
    const reason = interaction.fields.getTextInputValue("reason");

    const robloxUser = await getRobloxUser(roblox);

    if (!robloxUser) {
        return interaction.reply({
            content: "❌ Roblox Benutzer nicht gefunden.",
            ephemeral: true
        });
    }

    await Punishment.create({
        robloxName: robloxUser.username,
        robloxId: robloxUser.id,
        displayName: robloxUser.displayName,
        avatar: robloxUser.avatar,

        type: "kick",
        reason,
        days: null,

        moderatorId: interaction.user.id,

        expiresAt: null
    });

    const log = interaction.client.channels.cache.get(
        config.punishmentLogChannelId
    );

    if (log) {

        const embed = new EmbedBuilder()
            .setColor("Orange")
            .setTitle("👢 Neuer Kick")
            .setThumbnail(robloxUser.avatar)
            .addFields(
                {
                    name: "👤 Roblox",
                    value: robloxUser.username,
                    inline: true
                },
                {
                    name: "🆔 Roblox ID",
                    value: String(robloxUser.id),
                    inline: true
                },
                {
                    name: "📝 Grund",
                    value: reason
                },
		{
    name: "🔗 Roblox Profil",
    value: `[Profil öffnen](https://www.roblox.com/users/${robloxUser.id}/profile)`
},
                {
                    name: "👮 Moderator",
                    value: `${interaction.user}`
                }
            )
            .setTimestamp();

        await log.send({
            embeds: [embed]
        });

    }

    return interaction.reply({
        content: "✅ Kick gespeichert.",
        ephemeral: true
    });

}

if (interaction.customId === "tempban_modal") {

    const roblox = interaction.fields.getTextInputValue("roblox");
    const days = interaction.fields.getTextInputValue("days");
    const reason = interaction.fields.getTextInputValue("reason");

    if (!/^\d+$/.test(days)) {
        return interaction.reply({
            content: "❌ Bitte nur Zahlen eingeben.",
            ephemeral: true
        });
    }

    const robloxUser = await getRobloxUser(roblox);

    if (!robloxUser) {
        return interaction.reply({
            content: "❌ Roblox Benutzer nicht gefunden.",
            ephemeral: true
        });
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + Number(days));

    await Punishment.create({
        robloxName: robloxUser.username,
        robloxId: robloxUser.id,
        displayName: robloxUser.displayName,
        avatar: robloxUser.avatar,

        type: "tempban",
        reason,
        days: Number(days),

        moderatorId: interaction.user.id,

        expiresAt: expires
    });
const log = interaction.client.channels.cache.get(
    config.punishmentLogChannelId
);

if (log) {

    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("⏳ Neuer Tempban")
        .setThumbnail(robloxUser.avatar)
        .addFields(
            {
                name: "👤 Roblox",
                value: robloxUser.username,
                inline: true
            },
            {
                name: "🆔 Roblox ID",
                value: String(robloxUser.id),
                inline: true
            },
            {
                name: "⏳ Dauer",
                value: `${days} Tage`,
                inline: true
            },
            {
                name: "📝 Grund",
                value: reason,
                inline: false
            },
	    {
    name: "🔗 Roblox Profil",
    value: `[Profil öffnen](https://www.roblox.com/users/${robloxUser.id}/profile)`
},
            {
                name: "👮 Moderator",
                value: `${interaction.user}`,
                inline: false
            }
        )
        .setTimestamp();

    await log.send({
        embeds: [embed]
    });

}
    return interaction.reply({
        content: "✅ Tempban gespeichert.",
        ephemeral: true
    });
}

if (interaction.customId === "permban_modal") {

    const roblox = interaction.fields.getTextInputValue("roblox");
    const reason = interaction.fields.getTextInputValue("reason");

    const robloxUser = await getRobloxUser(roblox);

    if (!robloxUser) {
        return interaction.reply({
            content: "❌ Roblox Benutzer nicht gefunden.",
            ephemeral: true
        });
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 35);

    await Punishment.create({
        robloxName: robloxUser.username,
        robloxId: robloxUser.id,
        displayName: robloxUser.displayName,
        avatar: robloxUser.avatar,

        type: "permban",
        reason,

        days: 35,

        moderatorId: interaction.user.id,

        expiresAt: expires
    });

    const log = interaction.client.channels.cache.get(
        config.punishmentLogChannelId
    );

    if (log) {

        const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setTitle("🔒 Permanenter Bann")
            .setThumbnail(robloxUser.avatar)
            .addFields(
                {
                    name: "👤 Roblox",
                    value: robloxUser.username,
                    inline: true
                },
                {
                    name: "🆔 Roblox ID",
                    value: String(robloxUser.id),
                    inline: true
                },
                {
                    name: "📝 Grund",
                    value: reason
                },
	        {
    name: "🔗 Roblox Profil",
    value: `[Profil öffnen](https://www.roblox.com/users/${robloxUser.id}/profile)`
},
                {
                    name: "👮 Moderator",
                    value: `${interaction.user}`
                }
            )
            .setTimestamp();

        await log.send({
            embeds: [embed]
        });

    }

    return interaction.reply({
        content: "✅ Permanenter Bann gespeichert.",
        ephemeral: true
    });

}


// ======================================
// MODALS
// ======================================

if (interaction.customId === "unban_name_modal") {
    return unbanSearch(interaction);
}

if (interaction.customId === "case_search_modal") {
    return caseSearch(interaction);
}

if (interaction.customId.startsWith("dm_modal_")) {
    return dmModal(interaction);
}

if (interaction.customId === "delete_cases_modal") {
    return deleteCasesModal(interaction);
}

if (interaction.customId.startsWith("unban_reason_modal_")) {

    const robloxId =
        interaction.customId.split("_")[3];

    const reason =
        interaction.fields.getTextInputValue("reason");

    const punishment = await Punishment.findOne({
    robloxId: Number(robloxId),
    type: { $in: ["tempban", "permban"] }
});

if (!punishment) {

    return interaction.reply({
        content: "❌ Für diesen Roblox-Account wurde kein aktiver Tempban oder Permban gefunden.",
        ephemeral: true
    });

}

    return require("../buttons/sendUnbanRequest")(interaction, {

        robloxId: punishment.robloxId,

        robloxName: punishment.robloxName,

        displayName: punishment.displayName,

        avatar: punishment.avatar

    }, punishment, reason);

}



// ======================================
// SELECT MENU
// ======================================

if (interaction.isStringSelectMenu()) {

    if (interaction.customId !== "punishment_type")
        return;

    const type = interaction.values[0];

    if (type === "kick") {

        const modal = new ModalBuilder()

            .setCustomId("kick_modal")

            .setTitle("👢 Kick eintragen");

        modal.addComponents(

            new ActionRowBuilder().addComponents(

                new TextInputBuilder()

                    .setCustomId("roblox")

                    .setLabel("Roblox Benutzername")

                    .setStyle(TextInputStyle.Short)

                    .setRequired(true)

            ),

            new ActionRowBuilder().addComponents(

                new TextInputBuilder()

                    .setCustomId("reason")

                    .setLabel("Grund")

                    .setStyle(TextInputStyle.Paragraph)

                    .setRequired(true)

            )

        );

        return interaction.showModal(modal);

    }

    if (type === "tempban") {

        const modal = new ModalBuilder()

            .setCustomId("tempban_modal")

            .setTitle("⏳ Temporären Bann eintragen");

        modal.addComponents(

            new ActionRowBuilder().addComponents(

                new TextInputBuilder()

                    .setCustomId("roblox")

                    .setLabel("Roblox Benutzername")

                    .setStyle(TextInputStyle.Short)

                    .setRequired(true)

            ),

            new ActionRowBuilder().addComponents(

                new TextInputBuilder()

                    .setCustomId("days")

                    .setLabel("Dauer (Tage)")

                    .setPlaceholder("7")

                    .setStyle(TextInputStyle.Short)

                    .setRequired(true)

            ),

            new ActionRowBuilder().addComponents(

                new TextInputBuilder()

                    .setCustomId("reason")

                    .setLabel("Grund")

                    .setStyle(TextInputStyle.Paragraph)

                    .setRequired(true)

            )

        );

        return interaction.showModal(modal);

    }

    if (type === "permban") {

    const modal = new ModalBuilder()

        .setCustomId("permban_modal")

        .setTitle("🔒 Permanenten Bann eintragen");

    modal.addComponents(

        new ActionRowBuilder().addComponents(

            new TextInputBuilder()

                .setCustomId("roblox")

                .setLabel("Roblox Benutzername")

                .setStyle(TextInputStyle.Short)

                .setRequired(true)

        ),

        new ActionRowBuilder().addComponents(

            new TextInputBuilder()

                .setCustomId("reason")

                .setLabel("Grund")

                .setStyle(TextInputStyle.Paragraph)

                .setRequired(true)

        )

    );

    return interaction.showModal(modal);

}

if (type === "case_search") {

    const modal = new ModalBuilder()

        .setCustomId("case_search_modal")

        .setTitle("🔍 Fall suchen");

    modal.addComponents(

        new ActionRowBuilder().addComponents(

            new TextInputBuilder()

                .setCustomId("roblox")

                .setLabel("Roblox Benutzername")

                .setStyle(TextInputStyle.Short)

                .setRequired(true)

        )

    );

    return interaction.showModal(modal);

}

}
        // BUTTONS
        if (!interaction.isButton()) return;

        console.log("Button:", interaction.customId);
// ======================================
// BUTTONS
// ======================================

if (interaction.customId === "unban_start") {
    return unbanStart(interaction);
}

if (interaction.customId === "dm_cancel") {
    return dmCancel(interaction);
}

if (interaction.customId === "unban_begin") {
    return unbanBegin(interaction);
}

if (interaction.customId === "dm_send") {
    return dmSend(interaction);
}

if (interaction.customId.startsWith("dm_open_")) {
    return dmOpen(interaction);
}

if (interaction.customId.startsWith("unban_reason_")) {
    return unbanReason(interaction);
}

if (interaction.customId.startsWith("unban_accept_")) {
    return unbanAccept(interaction);
}

if (interaction.customId.startsWith("unban_deny_")) {
    return unbanDecline(interaction);
}

if (interaction.customId === "duty_start") {
    return dienstStart(interaction);
}

if (interaction.customId === "duty_stop") {
    return dienstStop(interaction);
}

if (interaction.customId === "duty_delete_all_confirm") {
    return dutyDeleteAllConfirm(interaction);
}

if (interaction.customId === "duty_delete_all_cancel") {
    return dutyDeleteAllCancel(interaction);
}

if (interaction.customId === "duty_stats") {
    return dienstStats(interaction);
}

if (interaction.customId === "delete_cases_start") {
    return deleteCasesStart(interaction);
}

if (interaction.customId === "delete_cases_cancel") {
    return deleteCasesCancel(interaction);
}

if (interaction.customId === "duty_export") {
    return dutyExport(interaction);
}

if (interaction.customId === "duty_reset_user") {
    return dutyResetUser(interaction);
}

if (interaction.customId === "duty_delete_all") {
    return dutyDeleteAll(interaction);
}

if (interaction.customId === "case_search") {

    const modal = new ModalBuilder()
        .setCustomId("case_search_modal")
        .setTitle("🔍 Fälle suchen");

    modal.addComponents(

        new ActionRowBuilder().addComponents(

            new TextInputBuilder()
                .setCustomId("roblox")
                .setLabel("Roblox Benutzername")
                .setStyle(TextInputStyle.Short)
                .setRequired(true)

        )

    );

    return interaction.showModal(modal);

}

if (interaction.customId === "punishment_create") {


    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("punishment_type")
                .setPlaceholder("Strafe auswählen")
                .addOptions(
    {
        label: "👢 Kick",
        value: "kick"
    },
    {
        label: "⏳ Temporärer Bann",
        value: "tempban"
    },
    {
        label: "🔒 Permanenter Bann",
        value: "permban"
    }
    
)
        );

    return interaction.reply({
        content: "Welche Strafe möchtest du eintragen?",
        components: [row],
        ephemeral: true
    });

}


// ======================================
// STRAFSYSTEM
// ======================================


        if (interaction.customId === "rp_start") {
            return rpStart(interaction);
        }

        if (interaction.customId === "rp_stop") {
            return rpStop(interaction);
        }

        if (interaction.customId === "raid_suspect") {
            return raidSuspect(interaction);
        }

        if (interaction.customId === "raid_active") {
            return raidActive(interaction);
        }

        if (interaction.customId === "raid_end") {
            return raidEnd(interaction);
        }

        if (interaction.customId === "ingame_help") {
            return ingameHelp(interaction);
        }

        if (interaction.customId === "team_meeting") {
            return teamMeeting(interaction);
        }

        if (interaction.customId === "meeting_join") {
            return meetingJoin(interaction);
        }

        if (interaction.customId === "training_create") {
            return createTraining(interaction);
        }

        if (interaction.customId === "training_list") {
            return trainingList(interaction);
        }

        if (interaction.customId === "training_join") {
            return trainingJoin(interaction);
        }


    } catch (err) {
        console.error(err);
    }

};

