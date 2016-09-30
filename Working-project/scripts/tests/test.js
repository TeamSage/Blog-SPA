/*jshint esversion: 6 */
let chai = require('chai');
let expect = chai.expect;

describe('Testing', function() {
	it('Test 1', function() {
		expect(2).to.equal(2);
	});

	it('Test 2', function() {
		expect(2).to.equal(3);
	});

	describe('NestTest', function() {
		it('Test 1', function() {
			expect(typeof 'asd').to.equal('string');
		});
	});
});