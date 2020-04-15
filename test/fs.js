import assert from 'assert';
import { expect } from 'chai';
import '../dist/index';
import fs from 'fs';
import path from 'path';

let root = path.parse(process.mainModule.filename).dir;
let temp = path.join(root, "temp");    
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

    it('should copy the file and all of its contents exactly to the new location', () => {
        let toDirectory = temp + '/copied/files';
        let fileToCopy = __filename;
        
        return fs.copy(fileToCopy, toDirectory)
        .then((copiedFilePath) => {
            let original = fs.readFileSync(fileToCopy).toString('utf-8');
            let copy = fs.readFileSync(copiedFilePath).toString('utf-8');

            expect(original).to.deep.equal(copy);
        })
        .catch(error => {
           assert.fail(error);
        });
    });
});