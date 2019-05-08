const httpStatus = require('http-status');

module.exports = async function (context, req) {
    const contextLocal = context;

    contextLocal.log('JavaScript HTTP trigger function processed a request.');

    if (!req.body) {
        contextLocal.res = {
            status: httpStatus.BAD_REQUEST,
            body: {
                message: 'Please pass in login information.',
            },
        };

        return;
    }

    const { username, password } = req.body;

    contextLocal.res = {
        body: {
            message: `User '${username}' with password '${password}' is logged in.`,
        },
    };
};
