import fs from 'fs';

declare module 'fs' {    
    function ensureDirectoryExists(path: string, root: string): boolean;
}

fs.ensureDirectoryExists = function(path: string, root: string = ''): boolean {
    path = path.replace(/\\/g, "/");
    let directories: string[] = path.split('/');
    let nextDirectory: string | undefined = directories.shift();
    root = root + nextDirectory + '/';
    if(!fs.existsSync(root)) fs.mkdirSync(root);

    return !directories.length || fs.ensureDirectoryExists(directories.join('/'), root);
}