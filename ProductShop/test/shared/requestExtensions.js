const setBody = (req, body) => {
    req.body = body;
    return req;
};

module.exports = {
    setBody,
};
