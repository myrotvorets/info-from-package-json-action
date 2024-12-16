import { join } from 'node:path';
import { promisify } from 'node:util';
import fs from 'node:fs';
import * as core from '@actions/core';

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

interface IPackage {
    name?: string;
    version?: string;
    description?: string;
    homepage?: string;
    bugs?: {
        url?: string;
    };
    repository?: {
        url?: string;
    };
}

async function exists(path: fs.PathLike): Promise<boolean> {
    try {
        await stat(path);
        return true;
    } catch {
        return false;
    }
}

async function run(): Promise<void> {
    try {
        const dir = core.getInput('workingdir', { required: false }) || process.cwd();
        const file = join(dir, 'package.json');

        if (!(await exists(file))) {
            core.setFailed(`Unable to find file: ${file}`);
            return;
        }

        const content = await readFile(file, { encoding: 'utf-8' });
        const json = JSON.parse(content) as IPackage;

        core.setOutput('packageName', json.name);
        core.setOutput('packageVersion', json.version);
        core.setOutput('packageDescription', json.description);
        core.setOutput('packageHomepage', json.homepage);
        core.setOutput('packageBugsUrl', json.bugs?.url);
        core.setOutput('packageScmUrl', json.repository?.url);
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

void run();
