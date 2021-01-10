import { DistinctQuestion } from 'inquirer';

export interface Options {
  skipPrompts: boolean;
  git: boolean;
  template: string;
  runInstall: boolean;
  targetDir: string;
  templateDir?: string;
  projectName?: string;
}

export interface Questions {
  git: DistinctQuestion;
  projectName: DistinctQuestion;
  template: DistinctQuestion;
}

export interface Answers {
  git: boolean;
  projectName: string;
  template: string;
}
