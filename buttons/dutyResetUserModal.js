const Duty = require("../models/Duty");

module.exports = async (interaction) => {

    const userId =
        interaction.fields.getTextInputValue("userid");

    const result = await Duty.deleteMany({

        userId

    });

    return interaction.reply({

        content:
`✅ ${result.deletedCount} Schicht(en) wurden gelöscht.`,

        ephemeral: true

    });

};