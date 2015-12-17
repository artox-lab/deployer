import chalk from 'chalk';

export const error = (message) => {
  console.log(
    chalk.bold.red(`ERROR! ${message}`)
  );
};

export const success = (message) => {
  console.log(
    chalk.bold.green(`SUCCESS! ${message}`)
  );
};
