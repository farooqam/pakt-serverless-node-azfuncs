const bcrypt = require('bcryptjs');

const hash = plaintext => bcrypt.hashSync(plaintext);

module.exports = {
    hash,
};
