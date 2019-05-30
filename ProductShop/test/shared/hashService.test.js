/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const hashService = require('../../shared/hashService');

const should = chai.should();

describe('hashService tests', () => {
    it('returns true when password is correct', () => {
        const password = 'foo123';
        const hash = hashService.hash(password);
        const correct = hashService.compare(password, hash);
        correct.should.equal(true);
    });

    it('returns false when password is incorrect', () => {
        const hash = hashService.hash('foo123');
        const correct = hashService.compare('foo1234', hash);
        correct.should.equal(false);
    });
});
