const { CosmosClient } = require('@azure/cosmos');
const config = require('./config');

const { endpoint, masterKey } = config;
const client = new CosmosClient({ endpoint, auth: { masterKey } });
const databaseId = config.database.id;
//  const productCollection = config.productCollection.id;
const userLoginsCollection = config.userLoginsCollection.id;

const addUserLogin = async (user) => {
    const userLogin = {
        username: user.username,
        password: user.password,
        location: 'US',
        loginTime: new Date().getTime(),
    };

    const { item } = await client
        .database(databaseId)
        .container(userLoginsCollection)
        .items
        .create(userLogin);

    return item;
};

module.exports = {
    addUserLogin,
};
