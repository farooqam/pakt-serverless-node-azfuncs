const create = () => {
    const request = {};

    Object.defineProperty(request, 'withBody', {
        value: function withBody(body) {
            request.body = body;
            return request;
        },
    });

    return request;
};

module.exports = {
    create,
};
