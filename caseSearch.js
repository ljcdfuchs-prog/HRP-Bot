const axios = require("axios");
const { EmbedBuilder } = require("discord.js");
const Punishment = require("../models/Punishment");

module.exports = async (interaction) => {

    const username =
        interaction.fields.getTextInputValue("roblox");

    const response = await axios.post(
        "https://users.roblox.com/v1/usernames/users",
        {
            usernames: [username],
            excludeBannedUsers: false
        }
    );

    if (!response.data.data.length) {

        return interaction.reply({

            content: "❌ Roblox Benutzer nicht gefunden.",

            ephemeral: true

        });

    }

    const user = response.data.data[0];

    const cases = await Punishment.find({

        robloxId: user.id

    }).sort({

        createdAt: -1

    });

    if (!cases.length) {

        return interaction.reply({

            content: "❌ Keine Fälle gefunden.",

            ephemeral: true

        });

    }

    const embed = new EmbedBuilder()

        .setColor("Blue")

        .setTitle(`📂 Fallakte von ${user.name}`)

        .setDescription(

`🆔 Roblox ID: **${user.id}**

📊 Fälle: **${cases.length}**`

        );

    cases.forEach((c, index) => {

        let status = "🔴 Aktiv";

        if (c.type === "kick")
            status = "⚪ Kick";

        if (c.type === "tempban" && c.expiresAt < new Date())
            status = "🟡 Abgelaufen";

        embed.addFields({

            name: `📁 Fall #${cases.length-index}`,

            value:
`**Typ:** ${c.type}

**Grund:** ${c.reason}

**Moderator:** <@${c.moderatorId}>

**Datum:** <t:${Math.floor(c.createdAt.getTime()/1000)}:F>

**Status:** ${status}`

        });

    });

    return interaction.reply({

        embeds: [embed],

        ephemeral: true

    });

};