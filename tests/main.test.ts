import { ExecSyncOptions, execSync } from 'child_process';
import { join, normalize } from 'path';

describe('Test Run', () => {
    const runner = (options: ExecSyncOptions): void => {
        const action = join(__dirname, '..', 'src', 'main.ts');

        try {
            const response = execSync(`npx ts-node "${action}"`, options);

            expect(response).toContain('::set-output name=packageName::some-name');
            expect(response).toContain('::set-output name=packageVersion::1.2.3');
            expect(response).toContain('::set-output name=packageDescription::some description');
            expect(response).toContain('::set-output name=packageHomepage::https://example.com/home/');
            expect(response).toContain('::set-output name=packageBugsUrl::https://example.com/bugs/');
            expect(response).toContain('::set-output name=packageScmUrl::git+https://example.com/scm/');
        } catch (e) {
            fail(e);
        }
    };

    it('should find package.json in the current directory', () => {
        const options: ExecSyncOptions = {
            env: process.env,
            cwd: __dirname,
            encoding: 'utf-8',
        };

        runner(options);
    });

    it('should accept path to package.json', () => {
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
