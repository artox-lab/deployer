import chalk from 'chalk';

export const error = (message) => {
  return chalk.bold.red(`ERROR! ${message}`);
};

export const success = (message) => {
  return chalk.bold.green(`SUCCESS! ${message}`);
};

export const ask = (message) => {
  return chalk.cyan.bold.underline(message) + ' ';
};
