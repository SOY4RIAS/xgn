import { Questions } from '../typings';
import { NON_WHITE_SPACE, TEMPLATES } from '../utils/constants';

export const QUESTIONS: Questions = {
  projectName: {
    type: 'input',
    name: 'projectName',
    default: 'my-project',
    validate: (input: string) => {
      if (!NON_WHITE_SPACE.test(input)) {
        return 'Project Name should be with non-whitespace characters';
      }

      return true;
    }
  },
  template: {
    type: 'list',
    name: 'template',
    message: 'Please choose which project template to use',
    choices: () => [TEMPLATES.JAVASCRIPT, TEMPLATES.TYPESCRIPT]
  },
  git: {
    type: 'confirm',
    name: 'git',
    message: 'Should a git be initialized?',
    default: true
  }
};
