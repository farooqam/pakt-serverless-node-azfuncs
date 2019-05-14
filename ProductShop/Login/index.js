const httpStatus = require('http-status');
const sendResponse = require('../shared/sendResponse');
const userService = require('./userService');

module.exports = async function (functionContext, req) {
    const context = functionContext;

    context.log('JavaScript HTTP trigger function processed a request.');

    if (!req.body) {
        sendResponse(context, httpStatus.BAD_REQUEST, { message: 'Please pass in login information.' });
        return;
    }

    const { username, password } = req.body;

    if (!username || !password) {
        sendResponse(context, httpStatus.BAD_REQUEST, { message: 'Please pass in login information.' });
        return;
    }

    await userService.addUserLogin(req.body)
        .then(() => {
            sendResponse(context, httpStatus.OK, { message: `User '${username}' with password '${password}' is logged in.` });
        });
};
