import shelljs from 'shelljs';
import { DEPLOY_DIR_NAME } from './config';

export const gitClone = (url) => {
  return shelljs.exec(`git clone ${url} ${DEPLOY_DIR_NAME}`);
};

export const removeDir = () => {
  return shelljs.exec(`rm -rf ${DEPLOY_DIR_NAME}`);
};
