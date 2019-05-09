const runTest = async (api, context, request, verifyCb) => {
    await api(context, request);
    verifyCb(context.res);
};

module.exports = {
    runTest,
};
