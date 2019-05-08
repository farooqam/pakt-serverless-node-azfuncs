/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const httpStatus = require('http-status');
const api = require('../../Login/index');
const runApiTest = require('../shared/runApiTest');
const mockContext = require('../shared/mockContext');
const requestExtensions = require('../shared/requestExtensions');

const should = chai.should();

describe('login tests', () => {
    let context = null;

    beforeEach(() => {
        context = mockContext.createMockContext();
    });

    afterEach(() => {
        context = null;
    });

    it('returns ok with the expected message', async () => {
        const request = {
            body: {
                username: 'farooq',
                password: '123',
            },
        };

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.message.should.equal('User \'farooq\' with password \'123\' is logged in.');
            });
    });

    it('returns bad request when body is missing', async () => {
        const request = {};

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.BAD_REQUEST);
                res.body.message.should.equal('Please pass in login information.');
            });
    });
});
