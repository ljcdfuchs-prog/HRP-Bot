const codes = new Map();

module.exports = {

    set(userId, code) {
        codes.set(userId, {
            code,
            expires: Date.now() + 5 * 60 * 1000
        });
    },

    get(userId) {

        const data = codes.get(userId);

        if (!data) return null;

        if (Date.now() > data.expires) {

            codes.delete(userId);

            return null;

        }

        return data.code;

    },

    delete(userId) {

        codes.delete(userId);

    }

};