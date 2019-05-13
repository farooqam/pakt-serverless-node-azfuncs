const sinon = require('sinon');

const createMockContext = () => ({ log: sinon.spy() });

module.exports = {
    createMockContext,
};
