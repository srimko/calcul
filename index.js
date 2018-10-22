const inquirer = require('inquirer')
const Table = require('cli-table')
const chalk = require('chalk')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'montant',
      message: 'Entrer le montant :',
      default: 1000
    }
  ])
  .then(answers => {
    var table = new Table({
      head: ['Montant', 'Après frais Malt', 'Après taxe 22%', 'Charge en euros', 'Gains'],
      colWidths: [18, 18, 18, 18, 18]
    })

    let montant = answers.montant
    let montantAfterMaltFees =  montant * (1 - 0.10)
    let montantAfterGouvFees = montantAfterMaltFees * (1 - 0.22)
    let allFees = (montant - montantAfterMaltFees) + (montantAfterMaltFees - montantAfterGouvFees)
    let earns = montant - allFees
  
    table.push(
      [montant + '€', montantAfterMaltFees + '€', montantAfterGouvFees + '€', allFees + '€', chalk.green.bold(earns + '€')]
    )

    console.log(table.toString())
  })
