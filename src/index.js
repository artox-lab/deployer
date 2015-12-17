import readlineSync from 'readline-sync';
import chalk from 'chalk';
import fse from 'fs-extra';
import fs from 'fs';
import shelljs from 'shelljs';
import { error, success, ask } from './logger';
import { DEPLPOY_FILE_NAME, DEPLOY_DIR_NAME } from './config';
import getDeployConfig from './getDeployConfig';
import { propertyOf } from 'lodash';
import {
  gitClone,
  removeDeployDir
} from './commands';

const cachedGithubUrl = propertyOf(
  getDeployConfig()
)('githubUrl');

if (cachedGithubUrl) {
  removeDeployDir();
}

let githubUrl = (cachedGithubUrl  || readlineSync.question(
    ask('Enter a GitHub address:')
  )).trim();

if (!githubUrl) {
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

fse.outputJSONSync(DEPLPOY_FILE_NAME, {
  githubUrl
});

const projects = fs.readdirSync(DEPLOY_DIR_NAME)
  .filter(s => s !== '.git');

ask('Select a project:');

const projectIndex = readlineSync.keyInSelect(projects, '', {
  guide: false
});

console.log(
  projects[projectIndex]
);