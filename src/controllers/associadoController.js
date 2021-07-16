const { string2hash } = require('../utils/string2hash')
const passwordValidation = require('../utils/passwordValidation')
const { MSG } = require('../utils/fieldsAndMsgs')
const db = require('../models')
const { Cliente, Associado, Motoboy, Entrega } = db.sequelize.models
const sequelize = db.sequelize

module.exports = {

  async newAssociado(req, res) {
    const { nome, cnpj, senha, endereco } = req.body

    if (!nome || !cnpj || !senha) {
      res.status(400).json({ msg: 'Dados obrigatórios não preenchidos.' })
    }

    const errPassword = passwordValidation(senha)
    if (errPassword) {
      res.status(403).json({ msg: errPassword })
    }

    const isAssociado = await Associado.findOne({
      where: { cnpj: cnpj }
    })
    if (!isAssociado) {
      const associado = await Associado.create({
        nome,
        cnpj,
        senha: string2hash(senha),
        endereco,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível adicionar associado.', error })
      })

      if (associado) {
        res.status(201).json({ msg: 'Associado adicionado.' })
      } else {
        res.status(404).json({ msg: 'Houve algum erro ao adicionar associado.' })
      }
    } else {
      res.status(403).json({ msg: 'Já existe associado com esse CNPJ.' })
    }
  },

  async listAssociados(req, res) {
    const associados = await Associado.findAll({
      order: [['nome', 'ASC']],
    })
    if (associados) {
      res.status(200).json({ msg: 'OK', associados })
    }
  },

  async searchAssociadoByCNPJ(req, res) {
    const busca = req.body

    if (!busca.cnpj) { res.status(400).json({ msg: 'Não foi informado CNPJ' }) }

    const associado = await Associado.findOne({
      where: { cnpj: busca.cnpj }
    })

    if (associado) {
      res.status(200).json({ msg: 'OK', associado })
    }
    else {
      res.status(404).json({ msg: 'Não foi encontrado associado com CNPJ ' + busca.cnpj })
    }
  },

  async updateAssociado(req, res) {
    const { nome, cnpj, senha, endereco } = req.body
    var novasenha, novonome, novocnpj, novoend

    const idBusca = req.params.id


    const atual = await Associado.findOne({
      where: { id: idBusca }
    })


    if (atual === null) {
      res.status(404).json({ msg: 'Não foi encontrado associado com esse ID' })

    }
    else {
      novonome = (nome) ? nome : atual.nome
      novocnpj = (cnpj) ? cnpj : atual.cnpj
      novoend = (endereco) ? endereco : atual.endereco
    }

    // Se foi definida nova senha, faz a validação
    if (senha) {
      const errPassword = passwordValidation(senha)
      if (errPassword) {
        res.status(403).json({ msg: errPassword })
      }
      else {
        novasenha = string2hash(senha)
      }
    }
    else {
      novasenha = atual.senha
    }

    // Busca associado com CNPJ igual ao informado e que
    // não seja o atual
    const { Op } = require('sequelize')
    const isAssociado = await Associado.findOne({
      where: {
        cnpj: novocnpj,
        id: { [Op.ne]: idBusca }
      }
    })

    if (!isAssociado) {
      const associado = await Associado.update(
        {
          nome: novonome,
          cnpj: novocnpj,
          senha: novasenha,
          endereco: novoend
        },
        {
          where: { id: idBusca }
        }
      ).catch((error) => {
        res.status(500).json({ msg: 'Erro na alteração.', error })
      })

      if (associado) {
        res.status(201).json({ msg: 'Associado alterado.' })
      } else {
        res.status(404).json({ msg: 'Houve algum erro ao alterar associado.' })
      }
    } else {
      res.status(403).json({ msg: 'Já existe outro associado com esse CNPJ.' })
    }
  },

  async deleteAssociado(req, res) {
    const idBusca = req.params.id

    const deletado = await Associado.destroy({
      where: { id: idBusca }
    })

    if (deletado > 0) {
      res.status(200).json({ msg: 'Associado excluido com sucesso.' })
    } else {
      res.status(404).json({ msg: 'Associado não encontrado.' })
    }
  },


  async getMyData(req, res) {
    const myId = req.user.id

    const associado = await Associado.findOne({
      where: { id: myId }
    })

    if (associado) {
      res.status(200).json({ msg: 'OK', associado })
    }
    else {
      res.status(404).json({ msg: 'Não foram encontrado dados do associado' })
    }
  },

  async updateMe(req, res) {
    const { nome, cnpj, senha, endereco } = req.body
    var novasenha, novonome, novocnpj, novoend

    const idBusca = req.user.id

    const atual = await Associado.findOne({
      where: { id: idBusca }
    })

    if (atual === null) {
      res.status(404).json({ msg: 'Não foram encontrados dados do associado' })

    }
    else {
      novonome = (nome) ? nome : atual.nome
      novocnpj = (cnpj) ? cnpj : atual.cnpj
      novoend = (endereco) ? endereco : atual.endereco
    }

    // Se foi definida nova senha, faz a validação
    if (senha) {
      const errPassword = passwordValidation(senha)
      if (errPassword) {
        res.status(403).json({ msg: errPassword })
      }
      else {
        novasenha = string2hash(senha)
      }
    }
    else {
      novasenha = atual.senha
    }

    // Busca associado com CNPJ igual ao informado e que
    // não seja o atual
    const { Op } = require('sequelize')
    const isAssociado = await Associado.findOne({
      where: {
        cnpj: novocnpj,
        id: { [Op.ne]: idBusca }
      }
    })

    // Se tudo estava certo, atualiza
    if (!isAssociado) {
      const associado = await Associado.update(
        {
          nome: novonome,
          cnpj: novocnpj,
          senha: novasenha,
          endereco: novoend
        },
        {
          where: { id: idBusca }
        }
      ).catch((error) => {
        res.status(500).json({ msg: 'Erro na alteração.', error })
      })

      if (associado) {
        res.status(201).json({ msg: 'Associado alterado.' })
      } else {
        res.status(404).json({ msg: 'Houve algum erro ao alterar associado.' })
      }
    } else {
      res.status(403).json({ msg: 'Já existe outro associado com esse CNPJ.' })
    }
  },


  async report(req, res) {
    const idBusca = req.user.id

    const motoboysCount = await Motoboy.count({
      where: {
        'associado': idBusca
      },
      raw: true
    })

    const clientesCount = await Cliente.count({
      where: {
        'associado': idBusca
      },
      raw: true
    })

    const entregasCount = await Entrega.count({
      where: {
        'associado': idBusca,
        'status': 'Finalizado'
      },
      raw: true
    })

    const entregasTotal = await Entrega.count({
      where: {
        'associado': idBusca,
      },
      raw: true
    })

    const top5Clientes = await Entrega.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('Cliente.id')), 'qtde']
      ],
      where: {
        'associado': idBusca,
        'status': 'Finalizado'
      },
      include: [{
        model: Cliente,
        attributes: ['nome'],
      }],
      group: [[sequelize.col('Cliente.id')]],
      order: [[sequelize.fn('COUNT', sequelize.col('Cliente.id')),'DESC']],
      raw: true,
      limit: 5
    })

    let topClientes = {}
    top5Clientes.forEach(element => {
      topClientes[element['Cliente.nome']] = element['qtde'] + ' entrega(s).'
    })

    const top5Motoboys = await Entrega.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('Motoboy.id')), 'qtde']
      ],
      where: {
        'associado': idBusca,
        'status': 'Finalizado'
      },
      include: [{
        model: Motoboy,
        attributes: ['nome'],
      }],
      group: [[sequelize.col('Motoboy.id')]],
      order: [[sequelize.fn('COUNT', sequelize.col('Motoboy.id')),'DESC']],
      raw: true,
      limit: 5
    })

    let topMotoboys = {}
    top5Motoboys.forEach(element => {
      topMotoboys[element['Motoboy.nome']] = element['qtde'] + ' entrega(s).'
    })

    res.status(200).json({
      'Motoboys cadastrados': motoboysCount,
      'Clientes cadastrados': clientesCount,
      'Entregas realizadas': entregasCount,
      'Top 5 clientes': topClientes,
      'Top 5 motoboys': topMotoboys,
      'Entregas efetuadas': (entregasCount * 100 / entregasTotal).toFixed(2) + '%',
      'Entregas pendentes': ((1 - entregasCount / entregasTotal) * 100).toFixed(2) + '%',
    })
  }

}