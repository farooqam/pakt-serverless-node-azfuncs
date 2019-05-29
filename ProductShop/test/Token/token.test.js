/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const httpStatus = require('http-status');
const sinon = require('sinon');
const api = require('../../Token/index');
const runApiTest = require('../shared/runApiTest');
const mockContext = require('../shared/mockContext');
const requestFactory = require('../shared/requestFactory');
const userService = require('../../shared/userService');

const should = chai.should();

describe('token tests', () => {
    let context = null;
    let request = null;

    beforeEach(() => {
        context = mockContext.createMockContext();
        request = requestFactory.create();
        userService.getTokenForUser = sinon.stub();
    });

    afterEach(() => {
        context = null;
        request = null;
        userService.getTokenForUser.reset();
    });

    it('returns ok with a token', async () => {
        request = request.withBody({
            username: 'farooq',
            password: '123',
        });

        userService.getTokenForUser.withArgs(sinon.match.any).returns(Promise.resolve('foo'));

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.OK);
                res.body.auth.should.equal(true);
                res.body.token.should.equal('foo');
            });
    });

    it('returns unauthorized when a token could not be generated', async () => {
        request = request.withBody({
            username: 'farooq',
            password: '123',
        });

        userService.getTokenForUser.withArgs(sinon.match.any).returns(Promise.resolve(null));

        await runApiTest.runTest(api,
            context,
            request,
            (res) => {
                res.status.should.equal(httpStatus.UNAUTHORIZED);
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
