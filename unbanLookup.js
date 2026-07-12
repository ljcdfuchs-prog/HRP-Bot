const axios = require("axios");
const Punishment = require("../models/Punishment");

module.exports = async (username) => {

    const response = await axios.post(
        "https://users.roblox.com/v1/usernames/users",
        {
            usernames: [username],
            excludeBannedUsers: false
        }
    );

    if (!response.data.data.length)
        return null;

    const user = response.data.data[0];

    const avatar = await axios.get(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=420x420&format=Png&isCircular=false`
    );

    const punishment = await Punishment.findOne({
        robloxId: user.id
    });

    return {

        robloxId: user.id,

        robloxName: user.name,

        displayName: user.displayName,

        avatar: avatar.data.data[0].imageUrl,

        punishment

    };

};