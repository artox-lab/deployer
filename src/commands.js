import shelljs from 'shelljs';

export default {
  exec(cmd) {
    return shelljs.exec(cmd);
  },
  git() {
    console.log('git');
    return this;
  },
  remove() {
    console.log('remove');
    return this;
  },
  add() {
    console.log('add');
    return this;
  }
}
