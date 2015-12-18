import shelljs from 'shelljs';
import { Client } from 'ssh2';
import { success, error } from './log-types';

let sshClient = null;

export default {

  ssh(params) {
    sshClient = new Client();
    return new Promise((resolve, reject) => {
      sshClient
        .on('ready', () => {
          console.log(success('SSH ready!'));
          resolve();
        })
        .on('error', err => {
          console.log(error(err.message, 'ERROR SSH!'));
          reject(err);
        })
        .connect(params);
    });
  },

  sshClose() {
    sshClient.end();
    console.log(success('SSH closed!'));
    sshClient = null;
  }

}
