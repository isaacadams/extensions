import { expect } from 'chai';
import '../dist/index';

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