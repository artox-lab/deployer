import readlineSync from 'readline-sync';
import fse from 'fs-extra';
import fs from 'fs';
import shelljs from 'shelljs';
import { error, success, ask } from './log-types';
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

let githubUrl = (cachedGithubUrl || readlineSync.question(
  ask('Enter GitHub address:')
)).trim();


if (!githubUrl) {
  console.log(
    error('You should enter GitHub address!')
  );
  process.exit(1);
}

const { code, output } = gitClone(githubUrl);

if (code !== 0) {
  console.log(error(output));
  process.exit(1);
}

console.log(
  success('Repository cloned successfully!')
);

fse.outputJSONSync(DEPLPOY_FILE_NAME, {
  githubUrl
});

const projects = fs.readdirSync(DEPLOY_DIR_NAME)
  .filter(s => s !== '.git');
const projectIndex = readlineSync.keyInSelect(
  projects, ask('Select a project:'), {guide: false}
);
if (projectIndex === -1) {
  console.log(
    error('You should choose project!')
  );
  process.exit(1);
}
const projectName = projects[projectIndex];
const projectFile = require(`./${DEPLOY_DIR_NAME}/${projectName}/${projectName}.js`);