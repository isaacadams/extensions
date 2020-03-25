'use strict';
var expect = require('chai').expect;
let { getRandomInt } = require('../dist/index.js');

describe('getRandomInteger', () => {
    it('should fall in the range of 5 to 32', () => {
        expect(getRandomInt(5, 32)).to.be.within(5, 32);
    });

    it('should NOT fall in the range of 101 to 100', () => {
        expect(getRandomInt(-5, 100)).to.not.be.within(101, 1000);  
    });
});

describe('take extension functions', () => {
    it('takes 4 items randomly from an array of outs it into a new array', () => {
        let result = [ 1, 2, 3, 4, 5, 6 ].takeRandomly(4);
        expect(result).to.have.lengthOf(4);
    });
    
    it('takes the first 2 items from array and puts it into a new array', () => {
        expect([ 1, 2, 3, 4, 5, 6 ].take(2)).to.eql([ 1, 2 ]);
    });
    
    it('takes the last 2 items from array and puts it into a new array', () => {
        expect([ 1, 2, 3, 4, 5, 6 ].takeFromEnd(2)).to.eql([ 5, 6 ]);
    });
});

describe('string extension "isNullOrWhitespace"', () => {
    it('should evaluate an empty string as true', () => {
        expect("".isNullOrWhitespace()).to.be.true;
    });

    it('should evaluate an string of whitespaces as true', () => {
        expect("      ".isNullOrWhitespace()).to.be.true;
    });

    it('should evaluate a string with characters as false', () => {
        expect("   hello world      ".isNullOrWhitespace()).to.be.false;
    });

    it('should evaluate a string with numbers as false', () => {
        expect("123".isNullOrWhitespace()).to.be.false;
    });
});