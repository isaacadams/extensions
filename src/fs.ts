import fs, { PathLike } from 'fs';
import path from 'path';

declare module 'fs' {

    /**
     * Creates directories and all subdirectories for the specified path
     * @param {string} pathToFolder full path containing all the directories that need to exist
     * @param {string} root specify the absolute root from where the function should begin if {path} is relative
     */    
    function ensureDirectoryExists(pathToFolder: string, root?: string): IDirectoryDetails | null;

    /**
     * Copy a file from one directory to another
     * @param pathToFile the full path to the file desired to be copied
     * @param toDirectory the full path to the directory for which the file should be copied
     * @returns returns a promise with a string which is the full path to the copied file
     */
    function copy(pathToFile: string, toDirectory: string): Promise<string>;
}

interface IDirectoryDetails {
    root: string,
    pathToFolder: string,
    firstCreatedFolder: string,
    absolutePathToDirectory: PathLike
}

fs.ensureDirectoryExists = function(pathToFolder: string, root?: string): IDirectoryDetails | null {
    try {
        let isAbsolute = path.isAbsolute(pathToFolder);
        let isWin = process.platform === "win32";

        pathToFolder = pathToFolder.replace(/\\/g, "/");
        let directories: string[] = pathToFolder.split('/');
        let firstUnderRoot = directories[0];

        if(isAbsolute) {
            // first directory needs to be shifted in the absolute scenario, regardless of windows or linux
            let firstDirectory = directories.shift();
            // in the linux scenario, the first directory is going to be an empty string, so set the root directly to '/'
            root = isWin ? firstDirectory : "/";
        }
        root = cleanString(root, ".");

        let allNewFolders: any[] = [];

        function iterateThroughDirectories(parent: fs.PathLike): fs.PathLike {
            let nextDirectory: string | undefined = directories.shift();

            if(!nextDirectory) return parent;

            let pathToDirectory = path.join(parent.toString(), nextDirectory);
            let newFolderWasCreated = createFolderIfItDoesNotExistSync(pathToDirectory);

            if(newFolderWasCreated) allNewFolders.push({
                folderName: nextDirectory,
                pathToFolder: pathToDirectory
            });

            return iterateThroughDirectories(pathToDirectory);
        }

        let absolutePathToDirectory = iterateThroughDirectories(root);

        return {
            root,
            pathToFolder,
            firstCreatedFolder: allNewFolders[0],
            absolutePathToDirectory
        };

        /* let nextDirectory: string | undefined = directories.shift();
        if(!nextDirectory) return true;
        root = path.join(root, nextDirectory);
        if(!fs.existsSync(root)) fs.mkdirSync(root);
        return fs.ensureDirectoryExists(directories.join('/'), root); */
    }
    catch(e) {
        console.log(e);
        return null;
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

/**
 * 
 * @param pathToFolder {string} the path to the folder that should exist
 * @returns {boolean} lets the client know if a new folder was created
 */
function createFolderIfItDoesNotExistSync(pathToFolder: fs.PathLike): boolean {
    if(fs.existsSync(pathToFolder)) return false;
    fs.mkdirSync(pathToFolder);
    return true;
}

function cleanString(stringToClean: string | undefined, defaultValue: string): string {
    stringToClean = stringToClean ?? defaultValue;
    stringToClean = stringToClean?.isNullOrWhitespace() ? defaultValue : stringToClean;
    return stringToClean;
}
