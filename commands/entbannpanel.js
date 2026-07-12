const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = async (message) => {

    const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("🔓 HRP Entbannungssystem")
        .setDescription(`Wurdest du gebannt?

Klicke auf den Button unten, um einen Entbannungsantrag zu stellen.`)
        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId("unban_start")
            .setLabel("🔓 Entbannung beantragen")
            .setStyle(ButtonStyle.Primary)

    );

    await message.channel.send({
        embeds: [embed],
        components: [row]
    });

};