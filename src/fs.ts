import fs from 'fs';
import path from 'path';

declare module 'fs' {    
    function ensureDirectoryExists(path: string, root: string): boolean;
    function copy(pathToFile: string, toDirectory: string): Promise<string>;
}

/**
 * Creates directories and all subdirectories for the specified path
 * @param {string} path full path containing all the directories that need to exist
 * @param {string} root specify the absolute root from where the function should begin if {path} is relative
 */
fs.ensureDirectoryExists = function(path: string, root: string = ''): boolean {
    try {
        path = path.replace(/\\/g, "/");
        let directories: string[] = path.split('/');
        let nextDirectory: string | undefined = directories.shift();
        root = root + nextDirectory + '/';
        if(!fs.existsSync(root)) fs.mkdirSync(root);

        return !directories.length || fs.ensureDirectoryExists(directories.join('/'), root);
    }
    catch {
        return false;
    }
}

/**
 * Copy a file from one directory to another
 * @param {string} pathToFile the full path to the file desired to be copied
 * @param {string} toDirectory the full path to the directory for which the file should be copied
 * @returns {Promise<string>} returns a promise with a string which is the full path to the copied file
 */
fs.copy = function(pathToFile: string, toDirectory: string): Promise<string> {    
    return new Promise((res, rej) => {
        if(!fs.ensureDirectoryExists(toDirectory, '')) rej("could not create directories to copy the file to");
    
        let filename = path.basename(pathToFile);
        let destinationPathToFile = path.resolve(toDirectory, filename);
        
        var destinationStream = fs.createWriteStream(destinationPathToFile);

        fs.createReadStream(pathToFile)
            .pipe(destinationStream)
            .on('close', () => res(destinationPathToFile))
            .on('error', e => {
                console.error(e);
                rej(e);
            });
    });
}