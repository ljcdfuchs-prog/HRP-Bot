const Duty = require("../models/Duty");
const config = require("../config");

const timers = new Map();

module.exports = async (oldState, newState) => {

    const member = newState.member;

    const duty = await Duty.findOne({
        userId: member.id,
        active: true
    });

    if (!duty) return;

    const dutyChannel = config.dutyVoiceChannelId;

    // =====================================
    // Admin verlässt den Duty-Talk
    // =====================================
    if (
        oldState.channelId === dutyChannel &&
        newState.channelId !== dutyChannel
    ) {

        // Bereits gearbeitete Zeit speichern
        if (duty.startTime) {
            const worked = Date.now() - duty.startTime.getTime();
            duty.totalTime += worked;
        }

        duty.paused = true;
        duty.pauseTime = new Date();
        duty.startTime = null;

        await duty.save();

        try {

            await member.send(
`⏸️ **Deine Schicht wurde pausiert**

Du hast den Admin-Talk verlassen.

Wenn du innerhalb von **20 Minuten** nicht zurückkommst,
wird deine Schicht automatisch beendet.`
            );

        } catch {}

        const timer = setTimeout(async () => {

            const current = await Duty.findOne({
                userId: member.id,
                active: true
            });

            if (!current || !current.paused) return;

            current.active = false;
            current.paused = false;
            current.pauseTime = null;
            current.startTime = null;

            await current.save();

            try {
                await member.roles.remove(config.dutyRoleId);
            } catch {}

            try {

                await member.send(
`🛑 **Deine Schicht wurde automatisch beendet**

Du warst länger als **20 Minuten** nicht im Admin-Talk.

Deine bisherige Arbeitszeit wurde gespeichert.`
                );

            } catch {}

            timers.delete(member.id);

        }, 20 * 60 * 1000);

        timers.set(member.id, timer);

    }

    // =====================================
    // Admin kommt zurück
    // =====================================
    if (
        oldState.channelId !== dutyChannel &&
        newState.channelId === dutyChannel
    ) {

        if (!duty.paused) return;

        duty.paused = false;
        duty.pauseTime = null;
        duty.startTime = new Date();

        await duty.save();

        if (timers.has(member.id)) {

            clearTimeout(timers.get(member.id));
            timers.delete(member.id);

        }

        try {

            await member.send(
`▶️ **Willkommen zurück!**

Deine Schicht wurde automatisch fortgesetzt.`
            );

        } catch {}

    }

};