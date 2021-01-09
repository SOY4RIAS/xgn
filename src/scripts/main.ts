import { textSync } from 'figlet';
import { APP_NAME } from '../utils/constants';
import { cli } from './cli';

export function main(args: string[]) {
  console.log(textSync(APP_NAME));
  cli(args);
}
