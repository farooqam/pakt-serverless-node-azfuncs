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
    const hashedPassword = hashService.hash(user.password);

    const querySpec = {
        query: 'SELECT TOP 1 r.id FROM root r WHERE r.username=@username AND r.password=@hashedPassword',
        parameters: [
            {
                name: '@username',
                value: user.username,
            },
            {
                name: '@hashedPassword',
                value: hashedPassword,
            },
        ],
    };

    const { result: results } = await client
        .database(databaseId)
        .container(userLoginsCollection)
        .items
        .query(querySpec)
        .toArray();

    if (results.results.length === 0) {
        return null;
    }

    const token = jwt.sign({ id: results.result[0].id }, secret, { expiresIn: '1d' });
    return token;
};

module.exports = {
    addUserLogin,
    getTokenForUser,
};
