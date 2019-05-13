/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const httpStatus = require('http-status');
const api = require('../../Login/index');
const runApiTest = require('../shared/runApiTest');
const mockContext = require('../shared/mockContext');
const requestFactory = require('../shared/requestFactory');

const should = chai.should();

describe('login tests', () => {
    let context = null;
    let request = null;

    beforeEach(() => {
        context = mockContext.createMockContext();
        request = requestFactory.create();
    });

    afterEach(() => {
        context = null;
        request = null;
    });

    it('returns ok with the expected message', async () => {
        request = request.withBody({
            username: 'farooq',
            password: '123',
        });

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.message.should.equal('User \'farooq\' with password \'123\' is logged in.');
            });
    });

    it('returns bad request when body is missing', async () => {
        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.BAD_REQUEST);
                res.body.message.should.equal('Please pass in login information.');
            });
    });

    it('returns bad request when username is missing', async () => {
        request = request.withBody({
            password: '123',
        });

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.BAD_REQUEST);
                res.body.message.should.equal('Please pass in login information.');
            });
    });

    it('returns bad request when password is missing', async () => {
        request = request.withBody({
            username: 'farooq',
        });

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.BAD_REQUEST);
                res.body.message.should.equal('Please pass in login information.');
            });
    });
});
