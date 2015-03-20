/**
 * @class example
 * Unit test for example.js
 * 
 * @uses should
 * @uses example
 */

var should = require('should'),
	example = require('../app/lib/example');

describe('example', function(){
	describe('#multiply()', function() {
		it('2 multiplied by 1 should equal to 2', function(){
			example.multiply(2, 1).should.equal(2);	
		});
		
		it('2 multiplied by a string should throw an error', function() {
			(function(){
				example.multiply(2, '1');
			}).should.throw('Multiplication does not allow strings');
		});
		
		it('a string multiplied by 1 should throw an error', function() {
			(function(){
				example.multiply('2', 1);
			}).should.throw('Multiplication does not allow strings');
		});
	});
	
	describe('#divide()', function() {
		it('2 divided by 1 should equal to 2', function() {
			example.divide(2, 1).should.equal(2);
		});
		
		it('140 divided by 7 should equal to 20', function() {
			example.divide(140, 7).should.equal(20);
		});
		
		it('2 divided by a string should throw an error', function(){
			(function(){
				example.divide(2, '1');
			}).should.throw('Division does not allow strings');
		});
		
		it('a string divided by 2 should throw an error', function(){
			(function(){
				example.divide('1', 2);
			}).should.throw('Division does not allow strings');
		});
	});
});
