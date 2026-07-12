const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const dmCache = require("../utils/dmCache");

const colors = {

    rot: 0xED4245,
    blau: 0x5865F2,
    grün: 0x57F287,
    gruen: 0x57F287,
    gelb: 0xFEE75C,
    orange: 0xFAA61A,
    lila: 0x9B59B6,
    pink: 0xEB459E,
    schwarz: 0x2B2D31,
    weiß: 0xFFFFFF,
    weiss: 0xFFFFFF

};

module.exports = async (interaction) => {

    const target = interaction.customId.replace("dm_modal_", "");

    const colorInput = interaction.fields.getTextInputValue("color").toLowerCase();

    const title = interaction.fields.getTextInputValue("title");

    const description = interaction.fields.getTextInputValue("description");

    const buttonText = interaction.fields.getTextInputValue("buttonText");

    const buttonLink = interaction.fields.getTextInputValue("buttonLink");

    let color;

if (colors[colorInput]) {

    color = colors[colorInput];

} else if (/^#[0-9A-F]{6}$/i.test(colorInput)) {

    color = colorInput;

} else {

    return interaction.reply({
        content: "❌ Ungültige Farbe.\n\nBeispiele:\n• Blau\n• Rot\n• Grün\n• Gelb\n• #5865F2",
        ephemeral: true
    });

}

    dmCache.set(interaction.user.id, {

        target,
        color,
        title,
        description,
        buttonText,
        buttonLink

    });

    const embed = new EmbedBuilder()

        .setColor(color)

        .setTitle(title)

        .setDescription(description)

        .setTimestamp();

    const row = new ActionRowBuilder()

        .addComponents(

            new ButtonBuilder()

                .setCustomId("dm_send")

                .setLabel("✅ Senden")

                .setStyle(ButtonStyle.Success),

            new ButtonBuilder()

                .setCustomId("dm_cancel")

                .setLabel("❌ Abbrechen")

                .setStyle(ButtonStyle.Secondary)

        );

    await interaction.reply({

        content:
`📨 **Vorschau**

Empfänger:
${target === "all" ? "Alle Mitglieder" : `<@&${target}>`}`,

        embeds: [embed],

        components: [row],

        ephemeral: true

    });

};