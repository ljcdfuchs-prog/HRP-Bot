const rpSetup = require("../commands/rpSetup");
const codeSetup = require("../commands/codeSetup");
const leitungPanel = require("../commands/leitungPanel");
const ausbilderPanel = require("../commands/ausbilderPanel");
const entbannPanel = require("../commands/entbannpanel");
const dienstPanel = require("../commands/dienstPanel");
const schichtenVerwalten = require("../commands/schichtenVerwalten");
const baum = require("../commands/baum");
const deleteCases = require("../commands/deleteCases");
const dm = require("../commands/dm");
const clip = require("../commands/clip");


module.exports = async (message) => {

    if (message.author.bot) return;

    console.log(message.content);

    try {

        if (message.content === "!rp_setup") {
            await rpSetup(message);
        }

if (message.content === "!dienst_panel") {
    await dienstPanel(message);
}

if (message.content === "!schichten_verwalten") {
    return schichtenVerwalten(message);
}

        if (message.content === "!code_setup") {
            await codeSetup(message);
        }

if (message.content.startsWith("!dm ")) {
    return dm(message);
}

if (message.content === "!clip") {
    return clip.execute(message);
}

        if (message.content === "!leitung_panel") {
            await leitungPanel(message);
        }

if (message.content === "!delete_cases") {
    return deleteCases(message);
}

        if (message.content === "!ausbilder_panel") {
            console.log("Ausbilder Panel erkannt");
            await ausbilderPanel(message);
        }

if (message.content === "!baum") {
    return baum(message);
}

if(message.content === "!strafen_panel"){

    require("../commands/strafenPanel")(message);

}
if (message.content === "!entbann_panel") {

    await entbannPanel(message);

}

    } catch (err) {
        console.error(err);
    }
};