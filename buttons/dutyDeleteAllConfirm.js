const Duty = require("../models/Duty");

module.exports = async (interaction) => {

    await Duty.deleteMany({});

    return interaction.update({

        content: "✅ Alle Dienststatistiken wurden erfolgreich gelöscht.",

        components: []

    });

};