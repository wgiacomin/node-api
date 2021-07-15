const db = require('../models')
const { Associado, LoginMotoboy, Entrega } = db.sequelize.models
const sequelize = db.sequelize
const Motoboy = require('../models/Motoboy')

// "SELECT count(*) as qtde, cliente FROM Entregas GROUP BY cliente ORDER BY qtde DESC LIMIT 5"
async function query1(req, res) {

  const entregas = await Entrega.findAll({
    attributes: [
      'cliente',
      [sequelize.fn('COUNT', sequelize.col('*')), 'qtde']
    ],
    limit: 5
  })

  res.status(200).json({ msg: 'ok', entregas })
}

// SELECT count(*) as qtde, motoboy FROM Entregas WHERE status = 'Finalizado' GROUP BY motoboy ORDER BY qtde DESC LIMIT 5
async function query2(req, res) {

  const entregas = await Entrega.findAll({
    attributes: [
      'cliente',
      [sequelize.fn('COUNT', sequelize.col('*')), 'qtde'],
      'motoboy'
    ],
    where: {
      'status': 'Finalizado'
    },
    group: 'motoboy',
    limit: 5,
    order: [[sequelize.fn('count', sequelize.col('*')), 'DESC']]
  })

  res.status(200).json({ msg: 'ok', entregas })
}

// SELECT Motoboys.nome, count(*) as qtde, motoboy FROM Entregas JOIN Motoboys ON Entregas.motoboy = Motoboys.id WHERE Entregas.status = 'Finalizado' GROUP BY motoboy ORDER BY qtde DESC LIMIT 5
async function query3(req, res) {

  const entregas = await Entrega.findAll({
    attributes: [
      'motoboy',
      [sequelize.fn('COUNT', sequelize.col('*')), 'qtde'],  
    ],
    where: {
      'status': 'Finalizado'
    },
    include: [{
      model: Motoboy,
      attributes: ['nome']
    }],
    group: 'motoboy',
    limit: 5,
    order: [[sequelize.fn('count', sequelize.col('*')), 'DESC']]
  })

  res.status(200).json({ msg: 'ok', entregas })
}

module.exports = { query1, query2, query3 }