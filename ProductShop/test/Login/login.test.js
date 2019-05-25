/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const httpStatus = require('http-status');
const _ = require('lodash');
const sinon = require('sinon');
const api = require('../../Login/index');
const runApiTest = require('../shared/runApiTest');
const mockContext = require('../shared/mockContext');
const requestFactory = require('../shared/requestFactory');

const should = chai.should();

describe('login tests', () => {
    let context = null;
    let request = null;
    let originalProcessEnv = null;
    let userService = null;

    beforeEach(() => {
        originalProcessEnv = _.cloneDeep(process.env);
        process.env.endpoint = 'http://foo';
        process.env.masterKey = '12345';

        // eslint-disable-next-line global-require
        userService = require('../../Login/userService');

        context = mockContext.createMockContext();
        request = requestFactory.create();
        userService.addUserLogin = sinon.stub();
    });

    afterEach(() => {
        process.env = _.cloneDeep(originalProcessEnv);
        context = null;
        request = null;
        userService.addUserLogin.reset();
    });

    it('returns ok with the expected message', async () => {
        request = request.withBody({
            username: 'farooq',
            password: '123',
        });

        userService.addUserLogin.withArgs(sinon.match.any).returns(Promise.resolve('foo'));

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
