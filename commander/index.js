#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program
  .version(require('./package').version)
  .usage('<command> [options]')

program
  .command('announce <saying>')
  .description('Provide a saying to be styled!')
  .option('-c, --capitalize', 'Capitalize your saying!')
  .action((saying, cmd) => {
    if (cmd.capitalize) { 
      console.log(chalk.bold.yellow(saying.toUpperCase()))
    } else {
      console.log(chalk.bold.magenta(saying))
    }
  })

program
  .command('announce-multiple [sayings]')
  .description('Provide a saying to be styled!')
  .option('-c, --capitalize', 'Capitalize your saying!')
  .action((sayings, cmd) => {
    if (cmd.capitalize) { 
      sayings.forEach(saying => {
        console.log(chalk.bold.yellow(saying.toUpperCase()))
      })
    } else {
      sayings.forEach(saying => {
        console.log(chalk.bold.magenta(saying))
      })
    }
  })

program.parse(process.argv)
  