import assert from 'assert';
import { expect } from 'chai';
import '../dist/index';
import fs from 'fs';
import path from 'path';
import { after, before } from 'mocha';

let root = path.parse(process.mainModule.filename).dir;
let temp = path.join(root, "temp");    
if(fs.existsSync(temp)) throw new Error(`the test artifact directory already exists @ ${temp}`)
else console.log(`creating temporary test artifact directory @ ${temp}`);

const directoriesToDelete = [temp];

describe('fs extension functions', () => {
    before(function() {
        // create temporary directory to place generated artifacts
        fs.mkdirSync(temp);
    });

    after(function() {
        // remove temporary directory
        directoriesToDelete.forEach(d => {
            //console.log(`deleting ${d}`);
            if(!fs.existsSync(d)) return;
            fs.rmdirSync(d, { recursive: true })
        });
    });

    it('should create all directories without a root', () => {
        let directoryToCreate = path.join(temp, '/jingle/bells');
        let result = fs.ensureDirectoryExists(directoryToCreate);

        expect(fs.existsSync(directoryToCreate)).be.true;
        expect(result).to.not.be.null;
    });

    it('should create all directories given a root', () => {
        let directoryToCreate = 'jingle/bells/batman/smells';
        let result = fs.ensureDirectoryExists(directoryToCreate, temp);

        expect(fs.existsSync(path.join(temp, directoryToCreate))).be.true;
        expect(result).to.not.be.null;
    });

    it('should create all directories in "." given an invalid root', () => {
        let invalid_roots = [
            {case: "null", value: null},
            {case: "undefined", value: undefined},
            {case: "empty", value: ''},
            {case: "whitespace", value: '    '},
        ];

        let results = invalid_roots.map(r => {
            let directoryToCreate = r.case + '/jingle/bells/batman/smells';
            return {
                case: r.case,
                directory: "./" + directoryToCreate,
                result: fs.ensureDirectoryExists(directoryToCreate, r.value)
            };
        });

        results.forEach(r => directoriesToDelete.push("./" + r.case));

        results.forEach(r => {

            expect(fs.existsSync(r.directory), `${r.case} failed`).to.be.true;
            expect(r.result.root === ".", `${r.case} failed`).to.be.true;
            expect(r.result).to.not.be.null;
        });
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