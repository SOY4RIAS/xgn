import chalk from 'chalk';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';
// import { projectInstall } from 'pkg-install';

import { Options } from '../typings';
import { copyTemplateFiles, createGitignore, initGit } from '../utils/functions';

const access = promisify(fs.access);

export async function create(options: Options) {
  const templateDir = path.resolve(__dirname, '../../templates', options.template.toLowerCase());

  options.templateDir = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.log('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const taskList = new Listr<Options>();

  taskList.add({
    title: 'Copying files',
    task: (ctx) => copyTemplateFiles(templateDir, ctx.targetDir)
  });

  taskList.add({
    title: 'GIT',
    task: (ctx) => initGit(ctx.targetDir),
    enabled: (ctx) => ctx.git
  });

  taskList.add({
    title: 'Generate .gitignore',
    task: (ctx) => createGitignore(ctx.targetDir)
  });

  // taskList.add({
  //   title: 'Install dependencies',
  //   task: (ctx) => projectInstall({ cwd: ctx.templateDir })
  // });

  taskList.run(options);
}
