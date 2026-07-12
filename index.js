const {
    Client,
    GatewayIntentBits,
    Partials
} = require("discord.js");

const config = require("./config");
const connectMongo = require("./database/mongoose");
const autoClose = require("./utils/autoClose");

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMembers, // <-- GANZ WICHTIG

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent,

        GatewayIntentBits.GuildVoiceStates,

        GatewayIntentBits.DirectMessages

    ],

    partials: [
        Partials.Channel
    ]

});

client.on("messageCreate", (message) => {
    require("./events/messageCreate")(message);
});

client.on("interactionCreate", (interaction) => {
    require("./events/interactionCreate")(interaction);
});

client.on("voiceStateUpdate", (...args) =>
    require("./events/voiceStateUpdate")(...args)
);

client.once("clientReady", async () => {

    await connectMongo();

    autoClose(client);

    console.log(`${client.user.tag} ist online.`);

});

client.login(config.token);