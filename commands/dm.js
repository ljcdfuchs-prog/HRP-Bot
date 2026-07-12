const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    // Berechtigung prüfen
    if (!message.member.roles.cache.has(process.env.DM_ROLE)) {
        return message.reply("❌ Dafür hast du keine Berechtigung.");
    }

    const args = message.content.split(" ").slice(1);

    if (!args.length) {
        return message.reply(
`❌ Nutzung:

!dm all
oder
!dm @Rolle`
        );
    }

    let target = args.join(" ");

    // all erlauben
    if (target.toLowerCase() === "all") {
        target = "all";
    } else {

        const role = message.mentions.roles.first();

        if (!role) {
            return message.reply(
                "❌ Bitte gib **all** oder eine Rolle an."
            );
        }

        target = role.id;

    }

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId(`dm_open_${target}`)

                .setLabel("📨 Formular öffnen")

                .setStyle(ButtonStyle.Primary)

        );

    await message.reply({

        content:
`✅ Ziel ausgewählt:

${target === "all" ? "**Alle Mitglieder**" : `<@&${target}>`}

Klicke auf den Button, um deine Nachricht zu erstellen.`,

        components: [row]

    });

};