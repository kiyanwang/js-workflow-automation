var should = require('should');
var Calculator = require('../../models/calc.js').Calculator;

describe("Calculator unit test suite", function(){

	var calc = new Calculator();

	it("should add two numbers together", function(done){
		calc.add(2, 2).should.equal(4);
		done();
	});
	
	xit("should subtract a number from another", function(done){
		calc.subtract(5, 2).should.equal(3);
		done();
	});

	xit("should multiple two numbers together", function(done){
		calc.multiply(2, 3).should.equal(6);
		done();
	});
});