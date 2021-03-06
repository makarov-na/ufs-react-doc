import * as fs from 'fs';
import * as Bluebird from 'bluebird';
import * as path from 'path';

export function pathExists(checkPath: string): boolean {
    const pathParts = checkPath.split('/');
    let base = __dirname;

    for (let pathPart of pathParts) {
        base = path.join(__dirname, pathPart);
        if (!fs.existsSync(base)) {
            return false;
        }
    }

    return true;
}

export function getEnvVariable(varname: string): string | null {
    const envVarKey = Object.keys(process.env).find(envVar => envVar.toLowerCase() === varname.toLowerCase());
    return envVarKey ? process.env[envVarKey] : null;
}