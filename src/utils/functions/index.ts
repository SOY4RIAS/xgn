import { promisify } from 'util';
import ncp from 'ncp';
import execa from 'execa';

const copy = promisify(ncp);

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
