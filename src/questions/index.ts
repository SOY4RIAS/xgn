import { Questions } from '../typings';
import { TEMPLATES } from '../utils/constants';

const templateChoices = [TEMPLATES.JAVASCRIPT, TEMPLATES.TYPESCRIPT];

export const QUESTIONS: Questions = {
  template: {
    type: 'list',
    name: 'template',
    message: 'Please choose which project template to use',
    choices: templateChoices,
    default: templateChoices
  },
  git: {
    type: 'confirm',
    name: 'git',
    message: 'Should a git be initialized?',
    default: true
  }
};
