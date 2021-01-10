import chalk from 'chalk';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';

import { Options } from '../typings';
import { initGit } from '../utils/functions';
import { createDirectoryContents } from '../utils/functions/template';

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

  try {
    fs.mkdirSync(`${options.targetDir}/${options.projectName}`);
  } catch (error) {
    console.log(
      '%s Something went wrong at `%s`',
      chalk.red.bold('ERROR'),
      chalk.black.bgWhite.bold('creating project folder')
    );
  }

  const taskList = new Listr<Options>();

  taskList.add({
    title: 'Generating project',
    task: (ctx) =>
      createDirectoryContents(
        {
          projectName: ctx.projectName!,
          targetDir: ctx.targetDir,
          templatePath: templateDir
        },
        ctx
      )
  });

  taskList.add({
    title: 'Initializing Git...',
    task: (ctx) => initGit(`${ctx.targetDir}/${ctx.projectName}`),
    enabled: (ctx) => ctx.git
  });

  // taskList.add({
  //   title: 'Install dependencies',
  //   task: (ctx) => projectInstall({ cwd: ctx.templateDir })
  // });

  taskList.run(options);
}
