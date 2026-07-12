const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const dmCache = require("../utils/dmCache");

module.exports = async (interaction) => {

    console.log("=== DM SEND GESTARTET ===");

    try {

        const data = dmCache.get(interaction.user.id);
console.log(data);

        if (!data) {
            return interaction.reply({
                content: "❌ Keine Nachricht gefunden.",
                ephemeral: true
            });
        }

        await interaction.guild.members.fetch();

        let members = [];

        if (data.target === "all") {

    members = interaction.guild.members.cache.filter(member => !member.user.bot);

} else {

    const role = interaction.guild.roles.cache.get(data.target);

    if (!role) {
        return interaction.editReply({
            content: "❌ Rolle wurde nicht gefunden.",
            embeds: [],
            components: []
        });
    }

    members = interaction.guild.members.cache.filter(member =>
        !member.user.bot &&
        member.roles.cache.has(role.id)
    );

}

        let success = 0;
        let failed = 0;

        for (const member of members.values()) {

            try {

                const embed = new EmbedBuilder()
                    .setColor(data.color)
                    .setTitle(data.title)
                    .setDescription(data.description)
                    .setTimestamp();

                const payload = {
                    embeds: [embed]
                };

                if (
                    data.buttonText &&
                    data.buttonText.trim() !== "" &&
                    data.buttonLink &&
                    data.buttonLink.trim() !== ""
                ) {

                    let url = data.buttonLink.trim();

                    if (
                        !url.startsWith("https://") &&
                        !url.startsWith("http://")
                    ) {
                        url = "https://" + url;
                    }

                    payload.components = [

                        new ActionRowBuilder().addComponents(

                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel(data.buttonText)
                                .setURL(url)

                        )

                    ];

                }

                await member.send(payload);

                success++;

            } catch (err) {

                console.log(
                    `DM an ${member.user.tag} fehlgeschlagen:`,
                    err.message
                );

                failed++;

            }

        }

        dmCache.delete(interaction.user.id);

        return interaction.editReply({

            content:
`✅ **Versand abgeschlossen**

👥 Empfänger:
${data.target === "all"
? "Alle Mitglieder"
: `<@&${data.target}>`}

✅ Erfolgreich: **${success}**
❌ Fehlgeschlagen: **${failed}**`,

            embeds: [],

            components: []

        });

    } catch (err) {

        console.error("DM SEND FEHLER:");
        console.error(err);

        if (interaction.deferred) {

            return interaction.editReply({

                content: "❌ Beim Versenden ist ein Fehler aufgetreten.",

                embeds: [],

                components: []

            }).catch(() => {});

        }

        if (!interaction.replied) {

            return interaction.reply({

                content: "❌ Beim Versenden ist ein Fehler aufgetreten.",

                ephemeral: true

            }).catch(() => {});

        }

    }

};