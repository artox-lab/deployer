import chalk from 'chalk';

export const error = (message, type='ERROR!') => {
  return chalk.bold.red(`${type} ${message}`);
};

export const success = (message, type='SUCCESS!') => {
  return chalk.bold.green(`${type} ${message}`);
};

export const ask = (message) => {
  return chalk.cyan.bold(message) + ' ';
};
