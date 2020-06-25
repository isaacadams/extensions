import fs from 'fs';
import path from 'path';

declare module 'fs' {

    /**
     * Creates directories and all subdirectories for the specified path
     * @param {string} pathToFolder full path containing all the directories that need to exist
     * @param {string} root specify the absolute root from where the function should begin if {path} is relative
     */    
    function ensureDirectoryExists(pathToFolder: string, root?: string): boolean;

    /**
     * Copy a file from one directory to another
     * @param pathToFile the full path to the file desired to be copied
     * @param toDirectory the full path to the directory for which the file should be copied
     * @returns returns a promise with a string which is the full path to the copied file
     */
    function copy(pathToFile: string, toDirectory: string): Promise<string>;
}

fs.ensureDirectoryExists = function(pathToFolder: string, root?: string): boolean {
    try {
        root = root ?? ".";
        root = root?.isNullOrWhitespace() ? "." : root;
        pathToFolder = pathToFolder.replace(/\\/g, "/");
        let directories: string[] = pathToFolder.split('/');

        let nextDirectory: string | undefined = directories.shift();
        if(!nextDirectory) return true;
        root = path.join(root, nextDirectory);
        if(!fs.existsSync(root)) fs.mkdirSync(root);
        return fs.ensureDirectoryExists(directories.join('/'), root);
    }
    catch {
        return false;
    }
}

fs.copy = function(pathToFile: string, toDirectory: string): Promise<string> {    
    return new Promise((res, rej) => {
        if(!fs.ensureDirectoryExists(toDirectory)) rej("could not create directories to copy the file to");
    
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
