import { DistinctQuestion } from 'inquirer';

export interface Options {
  skipPrompts: boolean;
  git: boolean;
  template: string;
  runInstall: boolean;
  targetDir: string;
  templateDir?: string;
}

export interface Questions {
  git: DistinctQuestion;
  template: DistinctQuestion;
}

export interface Answers {
  template: string;
  git: boolean;
}
