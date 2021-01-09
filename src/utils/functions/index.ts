import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import gitignore from 'gitignore';
import ncp from 'ncp';
import execa from 'execa';

const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

export function copyTemplateFiles(templateDir: string, targetDir: string) {
  return copy(templateDir, targetDir, {
    clobber: false
  });
}

export async function initGit(cwd: string) {
  const result = await execa('git', ['init'], { cwd });

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }

  return Promise.resolve();
}

export function createGitignore(cwd: string) {
  const file = fs.createWriteStream(path.join(cwd, '.gitignore'), { flags: 'a' });
  return writeGitignore({
    type: 'Node',
    file
  });
}
