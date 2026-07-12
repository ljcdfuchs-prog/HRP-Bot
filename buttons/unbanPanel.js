const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (interaction) => {

    const embed = new EmbedBuilder()

        .setColor("Blue")

        .setTitle("🔓 Entbannungsantrag")

        .setDescription(
`Wurdest du auf HRP gebannt?

Dann kannst du hier einen Entbannungsantrag stellen.

📌 **Ablauf:**

1️⃣ Klicke auf den Button unten.
2️⃣ Du erhältst eine DM vom Bot.
3️⃣ Gib deinen Roblox-Namen ein.
4️⃣ Der Bot sucht deinen Bann.
5️⃣ Schreibe deine Entbannungsbegründung.
6️⃣ Das Team entscheidet über deinen Antrag.

⚠ Missbrauch kann bestraft werden.`
        )

        .setTimestamp();

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("unban_start")

                .setLabel("🔓 Entbannung beantragen")

                .setStyle(ButtonStyle.Primary)

        );

    await interaction.channel.send({

        embeds: [embed],

        components: [row]

    });

    return interaction.reply({

        content: "✅ Entbannungspanel wurde gesendet.",

        ephemeral: true

    });

};