import arg from 'arg';
import inquirer, { DistinctQuestion } from 'inquirer';

import { QUESTIONS } from '../questions';
import { Answers, Options } from '../typings';
import { ARGUMENTS, ALIAS, TEMPLATES } from '../utils/constants';
import { create } from './create';

function parseArgumentsIntoOptions(rawArgs: string[]): Options {
  const args = arg(
    {
      [ARGUMENTS.GIT]: Boolean,
      [ARGUMENTS.YES]: Boolean,
      [ARGUMENTS.INSTALL]: Boolean,
      [ALIAS.GIT]: ARGUMENTS.GIT,
      [ALIAS.YES]: ARGUMENTS.YES,
      [ALIAS.INSTALL]: ARGUMENTS.INSTALL
    },
    { argv: rawArgs.slice(2) }
  );

  return {
    skipPrompts: args[ARGUMENTS.YES] || false,
    git: args[ARGUMENTS.GIT] || false,
    template: args._[0],
    runInstall: args[ARGUMENTS.INSTALL] || false,
    targetDir: process.cwd()
  };
}

async function promptForMissingOptions(options: Options): Promise<Options> {
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || TEMPLATES.JAVASCRIPT
    };
  }

  const questions: DistinctQuestion[] = [];

  questions.push(QUESTIONS.projectName);

  if (!options.template) {
    questions.push(QUESTIONS.template);
  }

  if (!options.git) {
    questions.push(QUESTIONS.git);
  }

  const answers = await inquirer.prompt<Answers>(questions);

  return {
    ...options,
    git: options.git || answers.git,
    projectName: answers.projectName,
    template: options.template || answers.template
  };
}

export async function cli(args: string[]) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  create(options);
}
