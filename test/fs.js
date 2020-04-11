'use strict';
var expect = require('chai').expect;
let fs = require('fs');
let path = require('path');

let root = path.parse(process.mainModule.filename).dir;
let temp = root + "/temp";    
if(fs.existsSync(temp)) throw new Error(`the test artifact directory already exists @ ${temp}`)
else console.log(`creating temporary test artifact directory @ ${temp}`);

describe('fs extension functions', () => {
    before(function() {
        // create temporary directory to place generated artifacts
        fs.mkdirSync(temp);
    });

    after(function() {
        // remove temporary directory
        fs.rmdirSync(temp, { recursive: true });
    });

    it('should create the immediate and all following sub directories if they dont already exist', () => {
        let directoryToCreate = temp + '/jingle/bells';
        let result = fs.ensureDirectoryExists(directoryToCreate);
        expect(fs.existsSync(directoryToCreate)).be.true;
    });
});