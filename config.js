require("dotenv").config();

module.exports = {
    token: process.env.TOKEN,
    mongoUri: process.env.MONGODB_URI,

    statusChannelId: process.env.RP_STATUS_CHANNEL_ID,
    pingRoleId: process.env.RP_PING_ROLE_ID,

    raidChannelId: process.env.RAID_CHANNEL_ID,
    raidPingRoleId: process.env.RAID_PING_ROLE_ID,
    punishmentLogChannelId: process.env.PUNISHMENT_LOG_CHANNEL_ID,

    punishmentLogChannelId:
    process.env.PUNISHMENT_LOG_CHANNEL_ID,

    leitungChannelId: process.env.LEITUNG_CHANNEL_ID,
    meetingLogChannelId: process.env.MEETING_LOG_CHANNEL_ID,
    unbanChannelId: process.env.UNBAN_CHANNEL_ID,

    ausbildungChannelId: process.env.AUSBILDUNG_CHANNEL_ID,
    ausbildungLogChannelId: process.env.AUSBILDUNG_LOG_CHANNEL_ID,

    dutyVoiceChannelId: process.env.DUTY_VOICE_CHANNEL_ID,
    dutyLogChannelId: process.env.DUTY_LOG_CHANNEL_ID,
    dutyPanelChannelId: process.env.DUTY_PANEL_CHANNEL_ID,

    dutyRoleId: process.env.DUTY_ROLE_ID,
    dutyManagerRoleId: process.env.DUTY_MANAGER_ROLE_ID,


    startMessage: `
🚔 Das RP wurde gestartet!

joint gerne dem Server.
Join Code:eawmpf85

Viel Spaß beim Roleplay!
`,

    stopMessage: `
🔴 Das RP wurde beendet.

Vielen Dank fürs Mitspielen!
`,

    raidSuspectMessage: `
⚠️ Es besteht ein Raid-Verdacht.

Bitte aufmerksam bleiben und Regelverstöße melden.
`,

    raidActiveMessage: `
🚨 AKTIVER RAID

Das Team untersucht aktuell die Situation.
Bitte Ruhe bewahren.
`,

    raidEndMessage: `
✅ Raid beendet.

Die Situation wurde geklärt.
`
};