const httpStatus = require('http-status');
const sendResponse = require('../shared/sendResponse');
const userService = require('../shared/userService');

module.exports = async function (functionContext, req) {
    const context = functionContext;

    context.log('Function \'Token\' processed a request.');

    if (!req.body) {
        sendResponse(context, httpStatus.BAD_REQUEST, { message: 'Please pass in login information.' });
        return;
    }

    const { username, password } = req.body;

    if (!username || !password) {
        sendResponse(context, httpStatus.BAD_REQUEST, { message: 'Please pass in login information.' });
        return;
    }

    await userService.getTokenForUser(req.body)
        .then((token) => {
            if (token !== null) {
                sendResponse(context, httpStatus.OK, { auth: true, token });
            } else {
                sendResponse(context, httpStatus.UNAUTHORIZED);
            }
        })
        .catch((error) => {
            context.log(error);
            sendResponse(context, httpStatus.INTERNAL_SERVER_ERROR);
        });
};
