module.exports = (context, status, body) => {
    context.res = {
        status,
        body,
    };
};
