const config = {};

config.endpoint = 'https://foo/';
config.masterKey = 'foo';

config.database = {
    id: 'ProductShop',
};

config.productCollection = {
    id: 'Products',
};

config.userLoginsCollection = {
    id: 'UserLogins',
};

module.exports = config;
