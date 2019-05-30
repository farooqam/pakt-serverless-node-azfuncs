const { CosmosClient } = require('@azure/cosmos');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const hashService = require('../shared/hashService');

const { endpoint, masterKey, secret } = process.env;
const client = new CosmosClient({ endpoint, auth: { masterKey } });
const databaseId = config.database.id;
const userLoginsCollection = config.userLoginsCollection.id;

const addUserLogin = async (user) => {
    const userLogin = {
        username: user.username,
        password: hashService.hash(user.password),
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

const getTokenForUser = async (user) => {
    const querySpec = {
        query: 'SELECT TOP 1 r.password, r.id FROM root r WHERE r.username=@username',
        parameters: [
            {
                name: '@username',
                value: user.username,
            },
        ],
    };

    const results = await client
        .database(databaseId)
        .container(userLoginsCollection)
        .items
        .query(querySpec, { enableCrossPartitionQuery: true })
        .toArray();

    const userLogins = results.result;

    if (userLogins.length === 0) {
        return null;
    }

    if (!hashService.compare(user.password, userLogins[0].password)) {
        return null;
    }

    const token = jwt.sign({ id: userLogins[0].id }, secret, { expiresIn: '1d' });
    return token;
};

module.exports = {
    addUserLogin,
    getTokenForUser,
};
