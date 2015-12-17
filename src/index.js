import readlineSync from 'readline-sync';
import chalk from 'chalk';
import fs from 'fs-extra';
import shelljs from 'shelljs';
import { error, success } from './logger';
import { DEPLPOY_FILE_NAME, DEPLOY_DIR_NAME } from './config';
import getDeployConfig from './getDeployConfig';
import { propertyOf } from 'lodash';

import {
  gitClone,
  removeDir
} from './commands';

const cachedGithubUrl = propertyOf(
  getDeployConfig()
)('githubUrl');

if (cachedGithubUrl) {
  removeDir();
}

let githubUrl = cachedGithubUrl  || readlineSync.question(
    chalk.cyan.bold.underline('Enter a GitHub address:') + ' '
  );

if (!githubUrl.trim()) {
  error('You should enter a GitHub address');
  process.exit(1);
}

const { code, output } = gitClone(githubUrl);

if (code === 0) {
  success('Repository cloned successfully');
} else {
  error(output);
  process.exit(1);
}

fs.outputJSONSync(DEPLPOY_FILE_NAME, { githubUrl });

