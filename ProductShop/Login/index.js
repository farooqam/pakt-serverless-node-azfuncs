const httpStatus = require('http-status');

module.exports = async function (functionContext, req) {
    const context = functionContext;

    context.log('JavaScript HTTP trigger function processed a request.');

    if (!req.body) {
        context.res = {
            status: httpStatus.BAD_REQUEST,
            body: {
                message: 'Please pass in login information.',
            },
        };

        return;
    }

    const { username, password } = req.body;

    if (!username || !password) {
        context.res = {
            status: httpStatus.BAD_REQUEST,
            body: {
                message: 'Please pass in login information.',
            },
        };

        return;
    }

    context.res = {
        status: httpStatus.OK,
        body: {
            message: `User '${username}' with password '${password}' is logged in.`,
        },
    };
};
