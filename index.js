const inquirer = require('inquirer')
const Table = require('cli-table')
const chalk = require('chalk')
const _ = require('lodash')

function ExceptionError (message) {
  this.body = message
  this.name = 'ExceptionUtilisateur'
}

// Get all parameters
let parameters = process.argv.slice(2)

const validParameters = ['-montant', '--m']

try {
  // Check if parameter has a correct syntaxe ex : --m=XXX or -montant=XXX
  _.each(parameters, (parameter) => {
    let parameterSplited = parameter.split('=')
    if (parameterSplited.length > 2 || parameterSplited === undefined) {
      throw new ExceptionError('Mauvais formattage de paramètre. Pour le moment le seul paramètre supporter est "-montant=100 ou --m=100.')
    } else {
      let param = parameterSplited[0]
      let paramValue = parameterSplited[1]

      // Check if param is a valid parameter
      let paramExist = _.includes(validParameters, param)

      if (!paramExist) {
        throw new ExceptionError('Mauvais formattage de paramètre. Pour le moment le seul paramètre supporter est "-montant=100 ou --m=100.')
      } else {
        run(paramValue)
      }
    }
  })
} catch (error) {
  console.log(chalk.red.bold('Erreur : ') + error.body)
}

function run (montant) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'montant',
        message: 'Entrer le montant :',
        default: montant !== undefined ? montant : 1000
      }
    ])
    .then(answers => {
      var table = new Table({
        head: ['Montant', 'Après frais Malt', 'Après taxe 22%', 'Charge en euros', 'Gains'],
        colWidths: [18, 18, 18, 18, 18]
      })

      let montant = answers.montant
      let montantAfterMaltFees = montant * (1 - 0.10)
      let montantAfterGouvFees = montantAfterMaltFees * (1 - 0.22)
      let allFees = (montant - montantAfterMaltFees) + (montantAfterMaltFees - montantAfterGouvFees)
      let earns = montant - allFees

      table.push(
        [montant + '€', montantAfterMaltFees + '€', montantAfterGouvFees + '€', allFees + '€', chalk.green.bold(earns + '€')]
      )
      console.log(table.toString())
    })
}
