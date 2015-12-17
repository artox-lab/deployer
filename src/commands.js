import shelljs from 'shelljs';
import fs from 'fs-extra';

import { DEPLOY_DIR_NAME } from './config';

export const gitClone = (url) => {
  return shelljs.exec(`git clone ${url} ${DEPLOY_DIR_NAME}`);
};

export const removeDeployDir = () => {
  return shelljs.exec(`rm -rf ${DEPLOY_DIR_NAME}`);
};
