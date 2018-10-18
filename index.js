const inquirer = require('inquirer')
const Table = require('cli-table')

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
    console.log(answers)

    var table = new Table({
      head: ['Montant', 'Après taxe 22%', 'Charge en euros'],
      colWidths: [18, 18, 18]
    })

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    table.push(
      [answers.montant + '€', answers.montant * (1 - 0.22) + '€', answers.montant * 0.22 + '€']
    )

    console.log(table.toString())
  })
