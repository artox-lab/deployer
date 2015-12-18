import fs from 'fs';
import fse from 'fs-extra';
import shelljs from 'shelljs';
import commands from './commands';
import { propertyOf } from 'lodash';
import readlineSync from 'readline-sync';
import getDeployConfig from './getDeployConfig';
import { error, success, ask } from './log-types';
import { DEPLPOY_FILE_NAME, DEPLOY_DIR_NAME } from './config';



const cachedGithubUrl = propertyOf(
  getDeployConfig()
)('githubUrl');

if (cachedGithubUrl) {
  shelljs.exec(`rm -rf ${DEPLOY_DIR_NAME}`);
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

const { code, output } =  shelljs.exec(`git clone ${githubUrl} ${DEPLOY_DIR_NAME}`);

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
const execFile = require(`../${DEPLOY_DIR_NAME}/${projectName}/${projectName}.js`);

try {
  execFile(commands);
  console.log(success('All commands executed successfully!'));
} catch(e) {
  console.log(error(e.message));
}

