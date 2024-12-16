import { equal } from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { ExecSyncOptions, execSync } from 'node:child_process';
import { join, normalize } from 'node:path';

void describe('Test Run', async () => {
    const runner = (options: ExecSyncOptions): void => {
        const action = join(__dirname, '..', 'src', 'main.ts');

        // eslint-disable-next-line sonarjs/os-command -- OK for testing
        const response = execSync(`npx ts-node "${action}"`, options).toString();

        equal(response.includes('::set-output name=packageName::some-name'), true);
        equal(response.includes('::set-output name=packageVersion::1.2.3'), true);
        equal(response.includes('::set-output name=packageDescription::some description'), true);
        equal(response.includes('::set-output name=packageHomepage::https://example.com/home/'), true);
        equal(response.includes('::set-output name=packageBugsUrl::https://example.com/bugs/'), true);
        equal(response.includes('::set-output name=packageScmUrl::git+https://example.com/scm/'), true);
    };

    before(() => {
        process.env.GITHUB_OUTPUT = '';
    });

    await it('should find package.json in the current directory', () => {
        const options: ExecSyncOptions = {
            env: process.env,
            cwd: __dirname,
            encoding: 'utf-8',
        };

        runner(options);
    });

    await it('should accept path to package.json', () => {
        const options: ExecSyncOptions = {
            env: {
                ...process.env,
                INPUT_WORKINGDIR: __dirname,
            },
            cwd: normalize(join(__dirname, '..')),
            encoding: 'utf-8',
        };

        runner(options);
    });
});
