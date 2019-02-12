const ora = require('ora');
const execa = require('execa');
const fs = require('fs-extra');

// Initialize our spinner, note that it's not spinning yet
const spinner = ora('Starting CLI . . .');

(async () => {
  try {
    await pauseForAMoment();
    await echoOutSomeText();
    await endProgram();
  } catch (err) {
    spinner.fail('There was an error while running the CLI');
    throw new Error(err)
  }
})();

// We'll use this function to delay our execution so we can see
// the nice spinner!
async function delay(timeout, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });
}

// To start we'll pause for a couple seconds
async function pauseForAMoment() {
  spinner.text = `Let's start by waiting a couple seconds . . .`;
  spinner.start();

  return delay(2000, () => {
    spinner.succeed('Yay! We waited 2 seconds ✅');
  })
}

// Then we'll echo out some text using our enhanced child process wrapper
async function echoOutSomeText() {
  spinner.text = 'Printing out some stuff: ';
  spinner.start();

  return new Promise((resolve, reject) => {
    const execution = execa('npm', ['start']);
    execution.stdout.pipe(process.stdout);
    
    execution.then(() => {
      delay(2000, () => {
        spinner.succeed('Yay we printed things!');
        resolve()
      });
    });
  });
}

// Finally we'll end out program
async function endProgram() {
  spinner.text = 'Ending the program';
  spinner.start();

  return delay(5000, () => {
    spinner.succeed('Program execution was successful!')
  })
}