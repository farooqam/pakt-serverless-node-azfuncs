const bcrypt = require('bcryptjs');

const hash = (plaintext) => {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(plaintext, salt);
};

const compare = (plaintext, hashedText) => bcrypt.compareSync(plaintext, hashedText);

module.exports = {
    hash,
    compare,
};
